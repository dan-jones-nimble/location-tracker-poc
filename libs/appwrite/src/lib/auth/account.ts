import { Account } from "appwrite"
import { client } from "../client"

export const account = new Account(client);

export const getAccount = async () => {
  try {
    return await account.get();
  } catch (e) {
    console.error(`Error getting account ${e}`);
    return false;
  }
};
