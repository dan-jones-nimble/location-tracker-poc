import { Teams } from 'appwrite';
import { client } from '../client';

export const teams = new Teams(client);

export { getTeam } from './getTeam';
export { getUserTeams } from './getUserTeams';
