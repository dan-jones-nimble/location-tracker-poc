const sdk = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const databases = new sdk.Databases(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY'] ||
    !req.variables['DATABASE_ID'] ||
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

  try {
    // would be nice to type the below
    const dbResponse = await databases.getDocument(
      req.variables['DATABASE_ID'],
      req.variables['ROUTES_COLLECTION_ID'],
      payloadJSON.routeId
    );
    console.log(dbResponse);

    const functionResponse = dbResponse.location_pings.map((ping) => ({
      latitude: ping.latitude,
      longitude: ping.longitude,
      altitude: ping.altitude,
      timestamp: ping.timestamp
    }));
    console.log(functionResponse);

    res.json({ code: 200, message: functionResponse }, 200);
  } catch (error) {
    res.json({ code: 500, message: error }, 500);
  }
};
