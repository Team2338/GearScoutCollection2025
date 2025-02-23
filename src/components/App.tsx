import { Fragment, useEffect, useState } from 'react';
import './App.scss';
import { IUser, IMatch } from '../model/Models.ts';
import DataCollectionPage from './data-collection-page/DataCollectionPage.tsx';
import LoginPage from './login-page/LoginPage.tsx';
import GearscoutService from '../services/GearScout-Service.tsx';
import UpdateBanner from './update-banner/UpdateBanner.tsx';
import { register } from '../ServiceWorkerRegistration.ts';


export default function App() {
	const [user, setUser] = useState<IUser>(null);
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

	function submitMatchData(match: IMatch): void {
		// Implement the match data submission logic here
		console.log('Submitting match data:', match);
		// You can add more logic to handle the match data submission process
		GearscoutService.submitMatch(user, match)
			.then(response => {
				console.log('Match data submitted successfully:', response);
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
					submitMatchData={submitMatchData}
				/>
			</div>
		);
	}

	return (
		<div className="app">
			<UpdateBanner hasUpdate={ hasUpdate } serviceWorker={ serviceWorker } />
			<LoginPage handleLogin={ setUser } />
		</div>
	);
}
