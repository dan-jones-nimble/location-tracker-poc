const sdk = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const databases = new sdk.Databases(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY'] ||
    !req.variables['DATABASE_ID'] ||
    !req.variables['LOCATION_PINGS_COLLECTION_ID'] ||
    !req.variables['ROUTES_COLLECTION_ID']
  ) {
    res.json({ success: false, message: 'Variables missing.' });
    return;
  }

  client
    .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);

  const payloadJSON = JSON.parse(req.payload);
  const userId = req.variables['APPWRITE_FUNCTION_USER_ID'];

  try {
    const dbResponse = await databases.createDocument(
      req.variables['DATABASE_ID'],
      req.variables['ROUTES_COLLECTION_ID'],
      payloadJSON.routeId,
      {
        user_id: userId,
        location_pings: [
          {
            user_id: userId,
            altitude: payloadJSON.location.coords.altitude,
            latitude: payloadJSON.location.coords.latitude,
            longitude: payloadJSON.location.coords.longitude,
            timestamp: payloadJSON.location.timestamp
          }
        ]
      }
    );

    res.json({ code: 200, message: dbResponse.response }, 200);
  } catch (error) {
    res.json({ code: 500, message: error }, 500);
  }
};
