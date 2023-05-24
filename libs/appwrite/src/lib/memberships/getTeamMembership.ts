import { getTeam, teams } from '../teams';

export const getTeamMembership = async ({ teamName }: { teamName: string }) => {
  try {
    const team = await getTeam({ teamName });

    if (team) {
      return await teams.listMemberships(team.$id);
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
