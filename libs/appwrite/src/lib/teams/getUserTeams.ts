import { teams } from '.';

export const getUserTeams = async () => {
  try {
    return await teams.list();
  } catch (e) {
    console.error(e);
    return false;
  }
};
