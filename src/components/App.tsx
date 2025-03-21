import { useEffect, useState } from 'react';
import './App.scss';
import { IUser, IMatch, IMatchLineup } from '../model/Models.ts';
import gearScoutService from '../services/GearScout-Service.tsx';
import DataCollectionPage from './data-collection-page/DataCollectionPage.tsx';
import LoginPage from './login-page/LoginPage.tsx';
import GearscoutService from '../services/GearScout-Service.tsx';
import UpdateBanner from './update-banner/UpdateBanner.tsx';
import { register } from '../ServiceWorkerRegistration.ts';


export default function App() {
	const [user, setUser] = useState<IUser>(null);
	const [schedule, setSchedule] = useState<IMatchLineup[]>(null);
	const [hasUpdate, setHasUpdate] = useState<boolean>(false);
	const [serviceWorker, setServiceWorker] = useState<ServiceWorker>(null);

	// Listen for updates on app init
	useEffect(() => {
		register({
			onUpdate: (sw: ServiceWorker) => {
				setHasUpdate(true);
				setServiceWorker(sw);
			},
			onSuccess: () => {
				window.location.reload();
			}
		});
	}, []);

	const handleLogin = (user: IUser): void => {
		gearScoutService.getEventSchedule(2025, 'mndu')
			.then((response) => {
				const res = response.data;
				console.log(res);
				setSchedule(res);
			})
			.catch((error) => console.error('Failed to get schedule', error));
		setUser(user);
	};

	function submitMatchData(match: IMatch): void {
		console.log('Submitting match data', match);
		GearscoutService.submitMatch(user, match)
			.then(response => {
				console.log('Match data submitted successfully', response);
			})
			.catch(error => {
				console.error('Error submitting match data:', error);
			});
	}

	if (user) {
		return (
			<div className="app">
				<UpdateBanner hasUpdate={ hasUpdate } serviceWorker={ serviceWorker } />
				<DataCollectionPage
					user={ user }
					schedule={ schedule }
					submitMatchData={submitMatchData}
				/>
			</div>
		);
	}

	return (
		<div className="app">
			<UpdateBanner hasUpdate={ hasUpdate } serviceWorker={ serviceWorker } />
			<LoginPage handleLogin={ handleLogin } />
		</div>
	);
}
