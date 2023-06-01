const sdk = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const databases = new sdk.Databases(client);

  const databaseId = req.variables['DATABASE_ID'];
  const routesCollectionId = req.variables['ROUTES_COLLECTION_ID'];

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY'] ||
    !req.variables['DATABASE_ID'] ||
    !req.variables['ROUTES_COLLECTION_ID']
  ) {
    res.json({ success: false, message: 'Variables missing.' }, 500);
    return;
  }

  client
    .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);

  const payloadJSON = JSON.parse(req.payload);

  const userId = req.variables['APPWRITE_FUNCTION_USER_ID'];
  const routeId = payloadJSON.routeId;

  const dbFormattedLocationPing = {
    user_id: userId,
    altitude: payloadJSON.location.coords.altitude,
    latitude: payloadJSON.location.coords.latitude,
    longitude: payloadJSON.location.coords.longitude,
    timestamp: payloadJSON.location.timestamp
  };

  databases
    .getDocument(databaseId, routesCollectionId, routeId)
    .then((getResponse) => {
      const oldLocations = getResponse.location_pings;
      const updatedLocations = [...oldLocations, dbFormattedLocationPing];

      databases
        .updateDocument(databaseId, routesCollectionId, routeId, {
          ...getResponse,
          location_pings: updatedLocations
        })
        .then((updateResponse) =>
          res.json(
            {
              code: 200,
              display: 'DB Update Success',
              message: updateResponse
            },
            200
          )
        )
        .catch((updateError) =>
          res.json(
            { code: 500, display: 'DB Update Failed', message: updateError },
            500
          )
        );
    })
    .catch((getError) => {
      if (getError.code === 404) {
        databases
          .createDocument(databaseId, routesCollectionId, routeId, {
            user_id: userId,
            location_pings: [dbFormattedLocationPing]
          })
          .then((createResponse) =>
            res.json(
              {
                code: 200,
                display: 'DB Create Success',
                message: createResponse
              },
              200
            )
          )
          .catch((createError) =>
            res.json(
              { code: 500, display: 'DB Create Failed', message: createError },
              500
            )
          );
      } else {
        console.error('GET ERROR: ', getError);
        res.json({ code: 500, message: getError }, 500);
      }
    });
};
