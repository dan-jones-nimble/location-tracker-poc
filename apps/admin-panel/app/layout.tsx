'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import { getAccount } from '@nx-expo/appwrite';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      if (pathname !== '/login') {
        const account = await getAccount();
        

        setLoading(false);
        if (!account) push('/login');
      }
    })();
  }, [pathname, push]);

  return (
    <html lang="en">
      <Head>
        <title>Welcome to admin-panel!</title>
      </Head>
      <body>{!loading && children}</body>
    </html>
  );
}
