import { Account } from 'appwrite';
import { client } from '../client';

export const account = new Account(client);

export const getAccount = async () => {
  try {
    return await account.get();
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
};

export const logout = async () => {
  try {
    console.log('account: ', await account.get());
    const sessions = await account.listSessions();
    console.log('session: ', sessions);
    return true;
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
};
