import { Account } from 'appwrite';
import { client } from '../client';

export const account = new Account(client);

interface ICredentials {
  email: string;
  password: string;
}

export const Login = async (credentials: ICredentials) => {
  return await account.createEmailSession(
    credentials.email,
    credentials.password
  );
};

export const GetAccount = async () => {
  try {
    return await account.get();
  } catch (e) {
    console.error(`Error getting account ${e}`);
    return false;
  }
};
