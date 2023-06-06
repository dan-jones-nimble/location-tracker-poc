import { Functions, Models } from 'appwrite';
import { client } from '../../client';
import { MinimalLocationObject } from '../location';

export interface RouteObject extends Models.Document {
	documentId: string;
	user_id: string;
	location_pings: Array<MinimalLocationObject>;
}

export const getAllRoutes = async (): Promise<Models.DocumentList<RouteObject>> => {
	const functions = new Functions(client);

	return functions
		.createExecution('647efa781c57861518e5')
		.then((execution) => {
			const response: {
				code: number;
				message: Models.DocumentList<RouteObject>;
			} = JSON.parse(execution.response);
			console.log('Success: ', response);
			if (response.code !== 200) throw new Error("Error getting routes");
			return response.message;
		})
		.catch((error) => {
			console.error('Error getting routes: ', error);
			return { documents: [], total: 0 };
		});
};
