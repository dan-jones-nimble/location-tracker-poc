'use client';
import Link from 'next/link';

import { getAccount, logout } from '@nx-expo/appwrite';

import { LogoutButton } from '../components';

import styles from './page.module.scss';

export default function Index() {
  // const account = await getAccount();
  // console.log('account: ', account);

  return (
    <div className={styles.page}>
      <h1>Home page</h1>
      {/* {!account && <Link href="/login">Login</Link>} */}
      <LogoutButton />
    </div>
  );
}
