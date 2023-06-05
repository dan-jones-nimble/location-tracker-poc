import { getUserTeams } from './getUserTeams';

export const getTeam = async ({ teamName }: { teamName: string }) => {
  try {
    const userTeams = await getUserTeams();
    if (userTeams) {
      return userTeams.teams.find((_team) => _team.name === teamName);
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
