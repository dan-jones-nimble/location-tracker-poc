'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';

import { getAccount, getUserPermissions } from '@nx-expo/appwrite';

export default function RootLayout(props: {
  children: React.ReactNode;
  planner: React.ReactNode;
  reader: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<Array<string>>([]);

  const { push } = useRouter();

  const getUser = useCallback(async () => {
    if (pathname !== '/login') {
      const account = await getAccount();
      const userPermissions = await getUserPermissions({ teamName: 'Admin' });
      if (userPermissions) setPermissions(userPermissions);

      setLoading(false);
      if (!account) push('/login');
    }
  }, [pathname, push]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <html lang="en">
      <Head>
        <title>Welcome to admin-panel!</title>
      </Head>
      <body>
        {!loading && props.children}
        {!loading && permissions.includes('plan_routes') && props.planner}
        {!loading && permissions.includes('read_routes') && props.reader}
      </body>
    </html>
  );
}
