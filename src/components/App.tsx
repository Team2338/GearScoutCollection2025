import { useState } from 'react';
import './App.scss';
import { IUser, ITeam, IAuto, ITeleop, IMatch } from '../model/Models.ts';
import DataCollectionPage from './data-collection-page/DataCollectionPage.tsx';
import LoginPage from './login-page/LoginPage.tsx';
import GearscoutService from '../services/GearScout-Service.tsx';

function App() {
	const [user, setUser] = useState<IUser>(null);

	if (user) {
		function handleDataCollection(user: ITeam): void {
			// Implement the data collection logic here
			console.log('Data collection for user:', user);
			// You can add more logic to handle the data collection process
		}
		function handleAuto(auto: IAuto): void {
			// Implement the auto handling logic here
			console.log('Handling auto data:', auto);
			// You can add more logic to process the auto data
		}
		function handleTeleop(teleop: ITeleop): void {
			// Implement the teleop handling logic here
			console.log('Handling teleop data:', teleop);
			// You can add more logic to process the teleop data
		}
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
		return <DataCollectionPage 
			user={ user } 
			handleDataCollection={handleDataCollection} 
			handleAuto={handleAuto} 
			handleTeleop={handleTeleop}
			submitMatchData={submitMatchData}
		/>;
	}

	return <LoginPage handleLogin={ setUser } />;
}

export default App;
