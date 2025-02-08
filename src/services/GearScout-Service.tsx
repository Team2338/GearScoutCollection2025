import { IMatch, IUser } from '../model/Models.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GearscoutResponse<T> = Promise<Response>;

class GearscoutService {
	private baseURL: string = 'https://data.gearitforward.com/';

	submitMatch = (user: IUser, match: IMatch): GearscoutResponse<void> => {
		const url: string = `${this.baseURL}/team/${user.teamNumber}`;
		const headers = {
			'Content-Type': 'application/json',
			'secretCode': user.secretCode.toString()
		};

		return fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(match)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to send data to server');
				}
				return response;
			});
	};
}

const service: GearscoutService = new GearscoutService();
export default service;