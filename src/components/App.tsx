import { useState } from 'react';
import './App.scss';
import { IUser } from '../model/Models.ts';
import DataCollectionPage from './data-collection-page/DataCollectionPage.tsx';
import LoginPage from './login-page/LoginPage.tsx';

function App() {
	const [user, setUser] = useState<IUser>(null);

	if (user) {
		return <DataCollectionPage user={ user } />;
	}

	return <LoginPage handleLogin={ setUser } />;
}

export default App;
