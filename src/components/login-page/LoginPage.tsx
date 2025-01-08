import './LoginPage.scss';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../model/Models.ts';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface IProps {
	handleLogin: (user: IUser) => void;
}

export default function LoginPage(props: IProps) {
	const [teamNumber, setTeamNumber] = useState<string>('');
	const [scouterName, setScouterName] = useState<string>('');
	const [eventCode, setEventCode] = useState<string>('');
	const [secretCode, setSecretCode] = useState<string>('');

	// Initialize inputs with last saved values
	useEffect(() => {
		setTeamNumber(localStorage.getItem('teamNumber') ?? '');
		setScouterName(localStorage.getItem('scouterName') ?? '');
		setEventCode(localStorage.getItem('eventCode') ?? '');
		setSecretCode(localStorage.getItem('secretCode') ?? '');
	}, []);

	const isValid: boolean = Boolean(
		teamNumber.trim()
		&& scouterName.trim()
		&& eventCode.trim()
		&& secretCode.trim()
	);

	const handleSubmit = (event): void => {
		event.preventDefault();
		if (!isValid) {
			return;
		}

		// Save login info for next session
		localStorage.setItem('teamNumber', teamNumber);
		localStorage.setItem('scouterName', scouterName);
		localStorage.setItem('eventCode', eventCode);
		localStorage.setItem('secretCode', secretCode);

		props.handleLogin({
			teamNumber: Number(teamNumber),
			scouterName: scouterName,
			eventCode: eventCode,
			secretCode: secretCode
		});
	};

	return (
		<main className="page login-page">
			<form
				className="login-form"
				onSubmit={ handleSubmit }
				aria-labelledby="login-form-header"
			>
				<h1 id="login-form-header">Sign in</h1>
				<TextField
					id="team-number-input"
					label="Team number"
					name="teamNumber"
					type="number"
					margin="dense"
					variant="outlined"
					value={ teamNumber }
					onChange={ (e) => setTeamNumber(e.target.value) }
					slotProps={{
						input: {
							startAdornment: <InputAdornment position="start">#</InputAdornment>
						},
						htmlInput: {
							min: 0,
							max: 9999
						}
					}}
					autoComplete="off"
					autoFocus={ true }
				/>
				<TextField
					id="scouter-name-input"
					label="Scouter name"
					name="scouterName"
					type="text"
					margin="dense"
					variant="outlined"
					autoComplete="off"
					value={ scouterName }
					onChange={ (e) => setScouterName(e.target.value) }
					slotProps={{
						htmlInput: {
							maxLength: 32
						}
					}}
				/>
				<TextField
					id="event-code-input"
					label="Event code"
					name="eventCode"
					type="text"
					margin="dense"
					variant="outlined"
					autoComplete="off"
					value={ eventCode }
					onChange={ (e) => setEventCode(e.target.value) }
					slotProps={{
						htmlInput: {
							maxLength: 32
						}
					}}
				/>
				<TextField
					id="secret-code-input"
					label="Secret code"
					name="secretCode"
					type="text"
					margin="dense"
					variant="outlined"
					autoComplete="off"
					value={ secretCode }
					onChange={ (e) => setSecretCode(e.target.value) }
					slotProps={{
						htmlInput: {
							maxLength: 32
						}
					}}
				/>
				<Button
					id="login-submit-button"
					type="submit"
					color="primary"
					variant="contained"
					onClick={ handleSubmit }
					disabled={ !isValid }
				>
					Submit
				</Button>
			</form>
		</main>
	);
};
