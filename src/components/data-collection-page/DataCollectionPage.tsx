import './DataCollectionPage.scss';
import {
	Button, FormControl,
	InputLabel, ListSubheader,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AllianceColor, Climb, Gamemode, IMatch, IMatchLineup, IUser, Move } from '../../model/Models.ts';

interface IProps {
	user: IUser;
	schedule: IMatchLineup[];
	submitMatchData: (submitMatchData: IMatch) => void;
}

export default function DataCollectionPage(props: IProps) {
	const [scoutTeamNumber, setScoutTeamNumber] = useState<string>('');
	const [matchNumber, setMatchNumber] = useState<string>('');
	const [allianceColor, setAllianceColor] = useState<AllianceColor>(AllianceColor.unknown);

	const [move, setMove] = useState<number>(Move.unknown);
	const [coralL4, setCoralL4] = useState<number>(0);
	const [coralL3, setCoralL3] = useState<number>(0);
	const [coralL2, setCoralL2] = useState<number>(0);
	const [coralL1, setCoralL1] = useState<number>(0);
	const [algeRem, setAlgeRem] = useState<number>(0);
	const [process, setProcess] = useState<number>(0);
	const [net, setNet] = useState<number>(0);

	const [coralL4Teleop, setCoralL4Teleop] = useState<number>(0);
	const [coralL3Teleop, setCoralL3Teleop] = useState<number>(0);
	const [coralL2Teleop, setCoralL2Teleop] = useState<number>(0);
	const [coralL1Teleop, setCoralL1Teleop] = useState<number>(0);
	const [algeRemTeleop, setAlgeRemTeleop] = useState<number>(0);
	const [processTeleop, setProcessTeleop] = useState<number>(0);
	const [netTeleop, setNetTeleop] = useState<number>(0);
	const [climb, setClimb] = useState<number>(Climb.unknown);

	useEffect(() => {
		setScoutTeamNumber(localStorage.getItem('scoutTeamNumber') ?? '');
		setMatchNumber(localStorage.getItem('matchNumber') ?? '');
		setAllianceColor(localStorage.getItem('allianceColor') as AllianceColor ?? AllianceColor.unknown);

		setMove(Number(localStorage.getItem('move')) || Move.no);
		setCoralL4(Number(localStorage.getItem('coralL4')) || 0);
		setCoralL3(Number(localStorage.getItem('coralL3')) || 0);
		setCoralL2(Number(localStorage.getItem('coralL2')) || 0);
		setCoralL1(Number(localStorage.getItem('coralL1')) || 0);
		setAlgeRem(Number(localStorage.getItem('algeRem')) || 0);
		setProcess(Number(localStorage.getItem('process')) || 0);
		setNet(Number(localStorage.getItem('net')) || 0);

		setCoralL4Teleop(Number(localStorage.getItem('coralL4Teleop')) || 0);
		setCoralL3Teleop(Number(localStorage.getItem('coralL3Teleop')) || 0);
		setCoralL2Teleop(Number(localStorage.getItem('coralL2Teleop')) || 0);
		setCoralL1Teleop(Number(localStorage.getItem('coralL1Teleop')) || 0);
		setAlgeRemTeleop(Number(localStorage.getItem('algeRemTeleop')) || 0);
		setProcessTeleop(Number(localStorage.getItem('processTeleop')) || 0);
		setNetTeleop(Number(localStorage.getItem('netTeleop')) || 0);
		setClimb(Number(localStorage.getItem('climb')) || Climb.none);
	}, []);

	const isValid: boolean = Boolean(
		scoutTeamNumber.trim()
		&& matchNumber.trim()
		&& allianceColor !== AllianceColor.unknown
		&& move !== Move.unknown
		&& climb !== Climb.unknown
	);

	const parsedMatchNumber = Number.parseInt(matchNumber);
	const shouldShowRobotDropdown: boolean =
		props.schedule
		&& parsedMatchNumber // Make sure it's a real number (NaN evaluates to false)
		&& parsedMatchNumber > 0
		&& parsedMatchNumber <= props.schedule.length;

	const handleSubmit = (event): void => {
		event.preventDefault();
		if (!isValid) {
			return;
		}

		const matchData: IMatch = {
			gameYear: 2025,
			eventCode: props.user.eventCode,
			matchNumber: matchNumber,
			robotNumber: scoutTeamNumber,
			creator: props.user.scouterName,
			allianceColor: allianceColor,

			objectives: [
				{gamemode: Gamemode.auto, objective: 'MOBILITY_2025', count: move},
				{gamemode: Gamemode.auto, objective: 'CORAL_FOUR_2025', count: coralL4},
				{gamemode: Gamemode.auto, objective: 'CORAL_THREE_2025', count: coralL3},
				{gamemode: Gamemode.auto, objective: 'CORAL_TWO_2025', count: coralL2},
				{gamemode: Gamemode.auto, objective: 'CORAL_ONE_2025', count: coralL1},
				{gamemode: Gamemode.auto, objective: 'ALGAE_REM_2025', count: algeRem},
				{gamemode: Gamemode.auto, objective: 'LOW_GOAL_2025', count: process},
				{gamemode: Gamemode.auto, objective: 'HIGH_GOAL_2025', count: net},

				{gamemode: Gamemode.teleop, objective: 'CORAL_FOUR_2025', count: coralL4Teleop},
				{gamemode: Gamemode.teleop, objective: 'CORAL_THREE_2025', count: coralL3Teleop},
				{gamemode: Gamemode.teleop, objective: 'CORAL_TWO_2025', count: coralL2Teleop},
				{gamemode: Gamemode.teleop, objective: 'CORAL_ONE_2025', count: coralL1Teleop},
				{gamemode: Gamemode.teleop, objective: 'ALGAE_REM_2025', count: algeRemTeleop},
				{gamemode: Gamemode.teleop, objective: 'LOW_GOAL_2025', count: processTeleop},
				{gamemode: Gamemode.teleop, objective: 'HIGH_GOAL_2025', count: netTeleop},
				{gamemode: Gamemode.teleop, objective: 'CLIMB_2025', count: climb}
			]
		};
		props.submitMatchData(matchData);

		localStorage.setItem('scoutTeamNumber', '');
		localStorage.setItem('matchNumber', '');
		localStorage.setItem('allianceColor', AllianceColor.unknown);

		localStorage.setItem('move', '0');
		localStorage.setItem('coralL4', '0');
		localStorage.setItem('coralL3', '0');
		localStorage.setItem('coralL2', '0');
		localStorage.setItem('coralL1', '0');
		localStorage.setItem('algeRem', '0');
		localStorage.setItem('process', '0');
		localStorage.setItem('net', '0');

		localStorage.setItem('coralL4Teleop', '0');
		localStorage.setItem('coralL3Teleop', '0');
		localStorage.setItem('coralL2Teleop', '0');
		localStorage.setItem('coralL1Teleop', '0');
		localStorage.setItem('algeRemTeleop', '0');
		localStorage.setItem('processTeleop', '0');
		localStorage.setItem('netTeleop', '0');
		localStorage.setItem('climb', '0');

		setScoutTeamNumber('');
		setMatchNumber('');
		setAllianceColor(AllianceColor.unknown);
		setMove(Move.unknown);
		setCoralL4(0);
		setCoralL3(0);
		setCoralL2(0);
		setCoralL1(0);
		setAlgeRem(0);
		setProcess(0);
		setNet(0);
		setCoralL4Teleop(0);
		setCoralL3Teleop(0);
		setCoralL2Teleop(0);
		setCoralL1Teleop(0);
		setAlgeRemTeleop(0);
		setProcessTeleop(0);
		setNetTeleop(0);
		setClimb(Climb.unknown);
	};

	useEffect(() => {
		if (shouldShowRobotDropdown) {
			setScoutTeamNumber('');
			setAllianceColor(AllianceColor.unknown);
		}
	}, [shouldShowRobotDropdown]);

	return (
		<main className="page data-collection-page">
			<form
				className="data-collection-form"
				onSubmit={ handleSubmit }
				aria-labelledby="data-collection-form-header"
			>
				<div className="header">
					<div className="logo">
						<img src="logos/192-pwa.png" alt="2338 logo" height="100rem" />
					</div>
					<div className="analytics">
						<Button sx={{m: 0.5}} variant="contained" href="https://data.gearitforward.com/">Analytics</Button>
					</div>
				</div>
				<TextField
					id="match-number"
					label="Match Number"
					name="matchNumber"
					type="number"
					margin="normal"
					variant="outlined"
					value={ matchNumber }
					onChange={ (event) => setMatchNumber(event.target.value) }
					slotProps={{
						htmlInput:
							{
								min: 0,
								max: 999,
							}
					}}
					autoComplete="off"
					autoFocus={ true }
				/>
				<RobotSelector
					shouldShowDropdown={ shouldShowRobotDropdown }
					lineup={ props.schedule?.[matchNumber] }
					value={ scoutTeamNumber }
					onChange={ (robotNum: string, allianceColor: AllianceColor) => {
						setScoutTeamNumber(robotNum);
						if (allianceColor) {
							setAllianceColor(allianceColor);
						}
					}}
				/>
				<ToggleButtonGroup
					id="alliance-color"
					className="toggle-button-group"
					aria-label="alliance color"
					value={ allianceColor }
					exclusive
					onChange={ (event, newValue) => setAllianceColor(newValue) }
				>
					<ToggleButton
						className="alliance-toggle red"
						value={ AllianceColor.red }
						selected={ allianceColor === AllianceColor.red }
						onClick={ () => setAllianceColor(AllianceColor.red) }
					>
						Red Alliance
					</ToggleButton>
					<ToggleButton
						className="alliance-toggle blue"
						value={ AllianceColor.blue }
						selected={ allianceColor === AllianceColor.blue }
						onClick={ () => setAllianceColor(AllianceColor.blue) }
					>
						Blue Alliance
					</ToggleButton>
				</ToggleButtonGroup>
				<h2 className="section-title">Auto</h2>
				<h3 id="leave-label" className="objective-label">Leave</h3>
				<ToggleButtonGroup
					id="leave"
					className="toggle-button-group"
					aria-labelledby="leave-label"
					value={ move }
					defaultValue={ Move.no }
					exclusive
					onChange={ (event, newValue) => setMove(newValue) }
				>
					<ToggleButton
						className="toggle-button"
						value={ Move.no }
						aria-label="no move"
						selected={ move === Move.no }
						onClick={ () => setMove(Move.no) }
					>
						No
					</ToggleButton>
					<ToggleButton
						className="toggle-button"
						value={ Move.yes }
						aria-label="yes move"
						selected={ move === Move.yes }
						onClick={ () => setMove(Move.yes) }
					>
						Yes
					</ToggleButton>
				</ToggleButtonGroup>
				<div className="counter-names">Coral Level 4</div>
				<div className="counter-container">
					<button className="counter-button" type="button" onClick={ () => coralL4 > 0 && setCoralL4(coralL4 - 1) }>-</button>
					<div className="counter-value">{ coralL4 }</div>
					<button className="counter-button" type="button" onClick={ () => setCoralL4(coralL4 + 1) }>+</button>
				</div>

				<div className="counter-names">Coral Level 3</div>
				<div className="counter-container">
					<button className="counter-button" type="button" onClick={ () => coralL3 > 0 && setCoralL3(coralL3 - 1) }>-</button>
					<div className="counter-value">{ coralL3 }</div>
					<button className="counter-button" type="button" onClick={ () => setCoralL3(coralL3 + 1) }>+</button>
				</div>

				<div className="counter-names">Coral Level 2</div>
				<div className="counter-container">
					<button className="counter-button" type="button" onClick={ () => coralL2 > 0 && setCoralL2(coralL2 - 1) }>-</button>
					<div className="counter-value">{ coralL2 }</div>
					<button className="counter-button" type="button" onClick={ () => setCoralL2(coralL2 + 1) }>+</button>
				</div>

				<div className="counter-names">Coral Level 1</div>
				<div className="counter-container">
					<button className="counter-button" type="button" onClick={ () => coralL1 > 0 && setCoralL1(coralL1 - 1) }>-</button>
					<div className="counter-value">{ coralL1 }</div>
					<button className="counter-button" type="button" onClick={ () => setCoralL1(coralL1 + 1) }>+</button>
				</div>

				<div className="counter-names">Algae Rem</div>
				<div className="counter-container">
					<button className="counter-button" type="button" onClick={ () => algeRem > 0 && setAlgeRem(algeRem - 1) }>-</button>
					<div className="counter-value">{ algeRem }</div>
					<button className="counter-button" type="button" onClick={ () => setAlgeRem(algeRem + 1) }>+</button>
				</div>

				<div className="counter-names">Processor</div>
				<div className="counter-container">
					<button className="counter-button" type="button" onClick={ () => process > 0 && setProcess(process - 1) }>-</button>
					<div className="counter-value">{ process }</div>
					<button className="counter-button" type="button" onClick={ () => setProcess(process + 1) }>+</button>
				</div>

				<div className="counter-names">Net</div>
				<div className="counter-container">
					<button className="counter-button" type="button" onClick={ () => net > 0 && setNet(net - 1) }>-</button>
					<div className="counter-value">{ net }</div>
					<button className="counter-button" type="button" onClick={ () => setNet(net + 1) }>+</button>
				</div>

				<h2 className="section-title">Teleop</h2>

				<div className="counter-names">Coral Level 4</div>
				<div className="counter-container">
					<button
						className="counter-button"
						type="button"
						onClick={ () => coralL4Teleop > 0 && setCoralL4Teleop(coralL4Teleop - 1) }
					>-
					</button>
					<div className="counter-value">{ coralL4Teleop }</div>
					<button className="counter-button" type="button" onClick={ () => setCoralL4Teleop(coralL4Teleop + 1) }>+</button>
				</div>

				<div className="counter-names">Coral Level 3</div>
				<div className="counter-container">
					<button
						className="counter-button"
						type="button"
						onClick={ () => coralL3Teleop > 0 && setCoralL3Teleop(coralL3Teleop - 1) }
					>-
					</button>
					<div className="counter-value">{ coralL3Teleop }</div>
					<button className="counter-button" type="button" onClick={ () => setCoralL3Teleop(coralL3Teleop + 1) }>+</button>
				</div>
				<div className="counter-names">Coral Level 2</div>
				<div className="counter-container">
					<button
						className="counter-button"
						type="button"
						onClick={ () => coralL2Teleop > 0 && setCoralL2Teleop(coralL2Teleop - 1) }
					>-
					</button>
					<div className="counter-value">{ coralL2Teleop }</div>
					<button className="counter-button" type="button" onClick={ () => setCoralL2Teleop(coralL2Teleop + 1) }>+</button>
				</div>

				<div className="counter-names">Coral Level 1</div>
				<div className="counter-container">
					<button
						className="counter-button"
						type="button"
						onClick={ () => coralL1Teleop > 0 && setCoralL1Teleop(coralL1Teleop - 1) }
					>-
					</button>
					<div className="counter-value">{ coralL1Teleop }</div>
					<button className="counter-button" type="button" onClick={ () => setCoralL1Teleop(coralL1Teleop + 1) }>+</button>
				</div>

				<div className="counter-names">Algae Rem</div>
				<div className="counter-container">
					<button
						type="button"
						onClick={ () => algeRemTeleop > 0 && setAlgeRemTeleop(algeRemTeleop - 1) }
						className="counter-button"
					>-
					</button>
					<div className="counter-value">{ algeRemTeleop }</div>
					<button className="counter-button" type="button" onClick={ () => setAlgeRemTeleop(algeRemTeleop + 1) }>+</button>
				</div>

				<div className="counter-names">Processor</div>
				<div className="counter-container">
					<button
						className="counter-button"
						type="button"
						onClick={ () => processTeleop > 0 && setProcessTeleop(processTeleop - 1) }
					>-
					</button>
					<div className="counter-value">{ processTeleop }</div>
					<button className="counter-button" type="button" onClick={ () => setProcessTeleop(processTeleop + 1) }>+</button>

				</div>
				<div className="counter-names">Net</div>
				<div className="counter-container">
					<button
						className="counter-button"
						type="button"
						onClick={ () => netTeleop > 0 && setNetTeleop(netTeleop - 1) }
					>-
					</button>
					<div className="counter-value">{ netTeleop }</div>
					<button className="counter-button" type="button" onClick={ () => setNetTeleop(netTeleop + 1) }>+</button>
				</div>

				<h3 id="climb-label" className="objective-label">Climb</h3>
				<ToggleButtonGroup
					id="climb"
					className="toggle-button-group"
					aria-labelledby="climb-label"
					value={ climb }
					exclusive
					onChange={ (event, newValue) => setClimb(newValue) }
				>
					<ToggleButton
						className="toggle-button"
						value={ Climb.none }
						selected={ climb === Climb.none }
						onClick={ () => setClimb(Climb.none) }
					>
						None
					</ToggleButton>
					<ToggleButton
						className="toggle-button"
						value={ Climb.park }
						selected={ climb === Climb.park }
						onClick={ () => setClimb(Climb.park) }
					>
						Park
					</ToggleButton>
					<ToggleButton
						className="toggle-button"
						value={ Climb.shallow }
						selected={ climb === Climb.shallow }
						onClick={ () => setClimb(Climb.shallow) }
					>
						Shallow
					</ToggleButton>
					<ToggleButton
						className="toggle-button"
						value={ Climb.deep }
						selected={ climb === Climb.deep }
						onClick={ () => setClimb(Climb.deep) }
					>
						Deep
					</ToggleButton>
				</ToggleButtonGroup>
				<div className="action-area">
					<button
						type="button"
						className="back-button"
						onClick={ () => window.location.href = '/' }
					>
						Back
					</button>
					<button
						type="submit"
						className="submit-button"
						onClick={ handleSubmit }
						disabled={ !isValid }
					>
						Submit
					</button>
				</div>
			</form>
		</main>
	);
}

interface IRobotSelectorProps {
	shouldShowDropdown: boolean;
	lineup: IMatchLineup;
	value: string;
	onChange: (robot: string, allianceColor: AllianceColor) => void;
}

function RobotSelector(props: IRobotSelectorProps) {
	if (!props.shouldShowDropdown) {
		return (
			<TextField
				id="scout-team-number"
				label="Team Number"
				name="scoutTeamNumber"
				type="number"
				margin="normal"
				variant="outlined"
				value={ props.value }
				onChange={ (event) => props.onChange(event.target.value, null) }
				slotProps={{
					htmlInput: {
						min: 0,
						max: 99999
					}
				}}
				autoComplete="off"
			/>
		);
	}

	const redRobots: string[] = [props.lineup.red1, props.lineup.red2, props.lineup.red3].map(String);
	const blueRobots: string[] = [props.lineup.blue1, props.lineup.blue2, props.lineup.blue3].map(String);

	if (props.value !== '' && !redRobots.includes(props.value) && !blueRobots.includes(props.value)) {
		return null;
	}

	const redElements = redRobots.map((robot: string) => <MenuItem key={ robot } value={ robot }>{ robot }</MenuItem>);
	const blueElements = blueRobots.map((robot: string) => <MenuItem key={ robot } value={ robot }>{ robot }</MenuItem>);

	const handleChange = (event: SelectChangeEvent) => {
		const value = event.target.value;
		if (redRobots.includes(value)) {
			props.onChange(value, AllianceColor.red);
			return;
		}

		if (blueRobots.includes(value)) {
			props.onChange(value, AllianceColor.blue);
			return;
		}

		props.onChange(value, AllianceColor.unknown);
	};

	return (
		<FormControl margin="normal">
			<InputLabel id="robot-number-label">Team Number</InputLabel>
			<Select
				id="robot-number-dropdown"
				labelId="robot-number-label"
				label="Team Number"
				value={ props.value }
				variant="outlined"
				onChange={ handleChange }
				sx={{ width: '8em' }}
			>
				<MenuItem value="">None</MenuItem>
				{ props.value }
				<ListSubheader sx={{ color: '#aa3333', fontWeight: 600 }}>Red</ListSubheader>
				{ redElements }
				<ListSubheader sx={{ color: '#2255cc', fontWeight: 600 }}>Blue</ListSubheader>
				{ blueElements }
			</Select>
		</FormControl>
	);
}
