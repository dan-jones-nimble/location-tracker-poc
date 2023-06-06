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

  const userId = req.variables['APPWRITE_FUNCTION_USER_ID'];

  try {
    const dbResponse = await databases.listDocuments(
      req.variables['DATABASE_ID'],
      req.variables['ROUTES_COLLECTION_ID'],
      [
        sdk.Query.select(['DocumentID', 'user_id']),
        sdk.Query.equal('user_id', [userId])
      ]
    );

    console.log(dbResponse);

    res.json({ code: 200, message: dbResponse }, 200);
  } catch (error) {
    res.json({ code: 500, message: error }, 500);
  }
};
