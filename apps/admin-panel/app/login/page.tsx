'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { ICredentials, emailLogin, getAccount } from '@nx-expo/appwrite';

export default function LoginPage() {
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const { push } = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredentials((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (credentials.email === '') return setError('Email can not be empty.');
      if (credentials.password === '')
        return setError('Password can not be empty.');

      await emailLogin({
        email: credentials.email,
        password: credentials.password,
      });
      setError('');
      window.location.reload();
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    (async () => {
      const user = await getAccount();

      if (user) push('/');
    })();
  }, [push]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" aria-required onChange={handleInput} />
        <input
          name="password"
          type="password"
          aria-required
          onChange={handleInput}
        />
        <input type="submit" />
      </form>
      {!!error && <p>{error}</p>}
    </div>
  );
}
