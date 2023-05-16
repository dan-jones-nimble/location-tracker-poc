'use client';

import { logout } from '@nx-expo/appwrite';

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const res = await logout();

      // Reset applications auth state
      if (res) window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
};
