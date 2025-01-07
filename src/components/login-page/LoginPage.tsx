import './LoginPage.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { IUser } from '../../model/Models.ts';

interface IProps {
	handleLogin: (user: IUser) => void;
}

export const LoginPage = (props: IProps) => {
	const [username, setUsername] = useState<string>('');

	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleLogin(null);
	};

	return (
		<main className="page login-page">
			<h1>Login page</h1>
			<form onSubmit={ handleSubmit }>
				<TextField
					value={ username }
					onChange={ (e) => setUsername(e.target.value) }
					label="Username"
					placeholder="Username"
					name="username"
				/>
				<Button>Log in</Button>
			</form>
		</main>
	);
};
