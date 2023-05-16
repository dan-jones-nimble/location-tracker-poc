import { account } from './account';

interface ICredentials {
  email: string;
  password: string;
}

export const emailLogin = async (credentials: ICredentials) => {
  return await account.createEmailSession(
    credentials.email,
    credentials.password
  );
};
