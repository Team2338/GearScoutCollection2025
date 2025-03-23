import './LoginPage.scss';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../model/Models.ts';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface IProps {
	handleLogin: (user: IUser, tbaCode: string) => void;
}

export default function LoginPage(props: IProps) {
	const [teamNumber, setTeamNumber] = useState<string>('');
	const [scouterName, setScouterName] = useState<string>('');
	const [eventCode, setEventCode] = useState<string>('');
	const [secretCode, setSecretCode] = useState<string>('');
	const [tbaCode, setTbaCode] = useState<string>('');

	// Initialize inputs with last saved values
	useEffect(() => {
		setTeamNumber(localStorage.getItem('teamNumber') ?? '');
		setScouterName(localStorage.getItem('scouterName') ?? '');
		setEventCode(localStorage.getItem('eventCode') ?? '');
		setSecretCode(localStorage.getItem('secretCode') ?? '');
		setTbaCode(localStorage.getItem('tbaCode') ?? '');
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
		localStorage.setItem('teamNumber', teamNumber.trim());
		localStorage.setItem('scouterName', scouterName.trim());
		localStorage.setItem('eventCode', eventCode.trim());
		localStorage.setItem('secretCode', secretCode.trim());
		localStorage.setItem('tbaCode', tbaCode.trim());

		props.handleLogin({
			teamNumber: Number(teamNumber),
			scouterName: scouterName.trim(),
			eventCode: eventCode.trim(),
			secretCode: secretCode.trim()
		}, tbaCode.trim());
	};

	return (
		<main className="page login-page">
			<div className="title">
				<div className="app-name">GearScout</div>
				<div className="version">v{ import.meta.env.VITE_APP_VERSION }</div>
			</div>
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
					margin="normal"
					variant="outlined"
					value={ teamNumber }
					onChange={ (e) => setTeamNumber(e.target.value) }
					slotProps={{
						input: {
							startAdornment: <span style={{ marginRight: '8px', color: '#faf9f6' }}>#</span>
						},
						htmlInput: {
							min: 0,
							max: 99999,
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
					margin="normal"
					variant="outlined"
					autoComplete="off"
					value={ scouterName }
					onChange={ (e) => setScouterName(e.target.value) }
					slotProps={{
						htmlInput: {
							maxLength: 32,
						}
					}}
				/>
				<TextField
					id="event-code-input"
					label="Event code"
					name="eventCode"
					type="text"
					margin="normal"
					variant="outlined"
					autoComplete="off"
					value={ eventCode }
					onChange={ (e) => setEventCode(e.target.value) }
					slotProps={{
						htmlInput: {
							maxLength: 32,
						}
					}}
				/>
				<TextField
					id="secret-code-input"
					label="Secret code"
					name="secretCode"
					type="text"
					margin="normal"
					variant="outlined"
					autoComplete="off"
					value={ secretCode }
					onChange={ (e) => setSecretCode(e.target.value) }
					slotProps={{
						htmlInput: {
							maxLength: 32,
						}
					}}
				/>
				<TextField
					id="tba-code-input"
					label="TBA code (optional)"
					helperText="The Blue Alliance event ID"
					name="tbaCode"
					type="text"
					margin="normal"
					variant="outlined"
					autoComplete="off"
					value={ tbaCode }
					onChange={ (e) => setTbaCode(e.target.value) }
					required={ false }
					slotProps={{
						htmlInput: {
							maxLength: 6,
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
