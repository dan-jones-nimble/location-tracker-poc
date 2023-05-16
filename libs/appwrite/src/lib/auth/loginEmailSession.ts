import { account } from './account';

export interface ICredentials {
  email: string;
  password: string;
}

export const emailLogin = async (credentials: ICredentials) => {
  return await account.createEmailSession(
    credentials.email,
    credentials.password
  );
};
