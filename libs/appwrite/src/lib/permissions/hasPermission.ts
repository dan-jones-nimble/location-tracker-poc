import { getUserPermissions } from './getUserPermissions';

export const hasPermission = async ({
  teamName,
  permission,
}: {
  teamName: string;
  permission: string;
}) => {
  const permissions = await getUserPermissions({ teamName });
  console.log('permissions: ', permissions);
  if (permissions) return permissions.includes(permission);
  return false;
};
