import { getAccount } from '../auth';
import { getTeamMembership } from '../memberships';

export const getUserPermissions = async (teamName: string) => {
  try {
    const teamMembership = await getTeamMembership({ teamName });
    const account = await getAccount();
    if (teamMembership && account)
      return teamMembership.memberships.find(
        (_membership) => _membership.userId === account.$id
      )?.roles;
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
