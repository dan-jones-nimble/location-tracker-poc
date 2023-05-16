import { Account } from 'appwrite';
import { client } from '../client';

export const account = new Account(client);

export const getAccount = async () => {
  try {
    return await account.get();
  } catch (e: any) {
    return false;
  }
};

export const logout = async () => {
  try {
    const sessions = await account.listSessions();

    return true;
  } catch (e: any) {
    return false;
  }
};
