import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IMatch, IUser } from '../model/Models.ts';

type GearscoutResponse<T> = Promise<AxiosResponse<T>>;

class GearscoutService {
	private service: AxiosInstance = axios.create({
		baseURL: 'https://gearitforward.com/api/v1'
	});

	submitMatch = (user: IUser, match: IMatch): GearscoutResponse<void> => {
		const url: string = `/team/${user.teamNumber}`;
		const config: AxiosRequestConfig = {
			headers: {
				'Content-Type': 'application/json',
				'secretCode': user.secretCode
			}
		};

		return this.service.post(url, match, config);
	};
}

const service: GearscoutService = new GearscoutService();
export default service;