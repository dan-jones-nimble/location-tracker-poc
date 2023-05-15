'use client';

import { logout } from '@nx-expo/appwrite';

export const LogoutButton = () => <button onClick={logout}>Log out </button>;
