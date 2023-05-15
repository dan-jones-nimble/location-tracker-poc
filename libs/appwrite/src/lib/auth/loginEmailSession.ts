import { account } from './account';

interface ICredentials {
  email: string;
  password: string;
}

export const emailLogin = async (credentials: ICredentials) => {
  const login = await account.createEmailSession(
    credentials.email,
    credentials.password
  );

  const jwt = await account.createJWT();
  console.log('jwt: ', jwt);

  return login;
};
