# Store a Location Ping

A Node Appwrite Function that stores a user's location ping against their UserId and RouteId.

_Example input:_

```json
{
  "routeId": "e0a8d40e-c0a5-4242-9f9e-28994566ea61",
  "location": {
    "coords": {
      "altitude": 0,
      "altitudeAccuracy": -1,
      "latitude": 30.785834,
      "accuracy": 5,
      "longitude": -122.406417,
      "heading": -1,
      "speed": -1
    },
    "timestamp": 1684851212563.252
  }
}
```

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - Appwrite API Key
- **DATABASE_ID** - ID of the Appwrite database where the `routes` collection is found
- **ROUTES_COLLECTION_ID** - ID of the `routes` collection to save the location ping

## 🚀 Deployment

There are two ways of deploying the Appwrite function, both having the same results, but each using a different process.
We highly recommend using CLI deployment to achieve the best experience.

### Using CLI

Make sure you have [Appwrite CLI](https://appwrite.io/docs/command-line#installation) installed, and you have
successfully logged into your Appwrite server. To make sure Appwrite CLI is ready, you can use the
command `appwrite client --debug` and it should respond with green text `✓ Success`.

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your
function. You will be prompted to select which functions you want to deploy.

### Manual using tar.gz

Manual deployment has no requirements and uses Appwrite Console to deploy the tag. First, enter the folder of your
function. Then, create a tarball of the whole folder and gzip it. After creating `.tar.gz` file, visit Appwrite Console,
click on the `Deploy Tag` button and switch to the `Manual` tab. There, set the `entrypoint` to `src/index.js`, and
upload the file we just generated.
