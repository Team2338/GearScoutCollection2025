import './DataCollectionPage.scss';
import { AllianceColor, Move, Climb, IUser, ITeam, IAuto, ITeleop, IMatch, Gamemode } from '../../model/Models.ts';
import { useEffect, useState } from 'react';
import { InputAdornment, TextField, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';

interface IProps {
	user: IUser;
	handleDataCollection: (user: ITeam) => void;
	handleAuto: (auto: IAuto) => void;
	handleTeleop: (teleop: ITeleop) => void;
	teamData: (teamData: IMatch) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function DataCollectionPage(props: IProps) {
	const [ scoutTeamNumber, setScoutTeamNumber ] = useState<string>('');
	const [ matchNumber, setMatchNumber ] = useState<string>('');
	const [ allianceColor, setAllianceColor ] = useState<AllianceColor>(AllianceColor.unknown);

	const [move, setMove] = useState<Move>(Move.unknown);
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
	const [climb, setClimb] = useState<Climb>(Climb.unknown);

	useEffect(() => {
		setScoutTeamNumber(localStorage.getItem('scoutTeamNumber') ?? '');
		setMatchNumber(localStorage.getItem('matchNumber') ?? '');
		setAllianceColor(localStorage.getItem('allianceColor') as AllianceColor ?? AllianceColor.unknown);

		setMove(localStorage.getItem('move') as Move ?? Move.unknown);
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
		setClimb(localStorage.getItem('climb') as Climb ?? Climb.none);
	}, []);

	const isValid: boolean = Boolean(
		scoutTeamNumber.trim()
		&& matchNumber.trim()
		&& allianceColor !== AllianceColor.unknown
		&& move !== Move.unknown
		&& climb !== Climb.unknown
	);

	const handleSubmit = (event): void => {
		event.preventDefault();
		if (!isValid) {
			return;
		}

		const teamData = () => ({
			gameYear: 2025,
			eventCode: this.props.eventCode,
			matchNumber: this.props.matchNumber,
			teamNumber: this.props.scoutTeamNumber,
			creator: this.props.scouterName,
			allianceColor: this.props.allianceColor,
			objectives: [
				{ gamemode: Gamemode.auto, objective: 'MOBILITY_2025', count: this.props.move },
				{ gamemode: Gamemode.auto, objective: 'CORAL_FOUR_2025', count: this.props.coralL4 },
				{ gamemode: Gamemode.auto, objective: 'CORAL_THREE_2025', count: this.props.coralL3 },
				{ gamemode: Gamemode.auto, objective: 'CORAL_TWO_2025', count: this.props.coralL2 },
				{ gamemode: Gamemode.auto, objective: 'CORAL_ONE_2025', count: this.props.coralL1 },
				{ gamemode: Gamemode.auto, objective: 'ALGAE_REM_2025', count: this.props.algeRem },
				{ gamemode: Gamemode.auto, objective: 'PROCESSOR_2025', count: this.props.process },
				{ gamemode: Gamemode.auto, objective: 'NET_2025', count: this.props.net },

				{ gamemode: Gamemode.teleop, objective: 'CORAL_FOUR_2025', count: this.props.coralL4Teleop },
				{ gamemode: Gamemode.teleop, objective: 'CORAL_THREE_2025', count: this.props.coralL3Teleop },
				{ gamemode: Gamemode.teleop, objective: 'CORAL_TWO_2025', count: this.props.coralL2Teleop },
				{ gamemode: Gamemode.teleop, objective: 'CORAL_ONE_2025', count: this.props.coralL1Teleop },
				{ gamemode: Gamemode.teleop, objective: 'ALGAE_REM_2025', count: this.props.algeRemTeleop },
				{ gamemode: Gamemode.teleop, objective: 'NET_2025', count: this.props.netTeleop },
				{ gamemode: Gamemode.teleop, objective: 'CLIMB_2025', count: this.props.climb },
			]	
		});

		teamData();

		localStorage.setItem('scoutTeamNumber', '');
		localStorage.setItem('matchNumber', '');
		localStorage.setItem('allianceColor', AllianceColor.unknown);

		localStorage.setItem('move', Move.unknown);
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
		localStorage.setItem('climb', Climb.unknown);

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

	return (
		<main className="page data-collection-page">
			<form
				className='data-collection-form'
				onSubmit={ handleSubmit }
				aria-labelledby='data-collection-form-header'
			>
				<div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#00243e', margin: '10px' }}>
					<div className="logo">
						<img src="logos/192-pwa.png" alt="2338 logo" height="100rem"/>
					</div>
					<div className="analytics">
						<Button sx={{ m: 0.5 }} variant="contained" href="https://data.gearitforward.com/">Analytics</Button>
					</div>
				</div>
				<div className="coral-level-container173" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<TextField
						id='scout-team-number'
						label='Team Number'
						name='scoutTeamNumber'
						type='number'
						margin='dense'
						variant='outlined'
						value={ scoutTeamNumber }
						onChange={ (event) => setScoutTeamNumber(event.target.value) }
						slotProps={{
							htmlInput:
							{
								min: 0,
								max: 99999,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						style={{ width: '125px', accentColor: 'orange', height: '60px' }}
						autoFocus={true}
						InputProps={{
							disableUnderline: true
						}}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<TextField
						id='match-number'
						label='Match Number'
						name='matchNumber'
						type='number'
						margin='dense'
						variant='outlined'
						value={ matchNumber }
						onChange={ (event) => setMatchNumber(event.target.value) }
						slotProps={{
							htmlInput:
							{
								min: 0,
								max: 999,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						style={{ width: '125px', height: '75px'}}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<ToggleButtonGroup
						id='alliance-color'
						value={ allianceColor }
						exclusive
						onChange={ (event, newValue) => setAllianceColor(newValue) }
						aria-label='alliance color'
						style={{ gap: '10px' }}
					>
						<ToggleButton 
							value='Red' 
							aria-label='red alliance' 
							selected={allianceColor === 'Red'}
							style={{ backgroundColor: allianceColor === 'Red' ? '#ff0000' : 'transparent', 
								color: allianceColor === AllianceColor.red ? 'white' : 'orange', 
								width: '135px',
								height: '35px',
								borderRadius: '5px',
								marginBottom: '10px'
							}}
							onClick={() => setAllianceColor(AllianceColor.red)}
						>
							Red Alliance
						</ToggleButton>
						<ToggleButton 
							value='Blue' 
							aria-label='blue alliance' 
							selected={allianceColor === 'Blue'}
							style={{ backgroundColor: allianceColor === 'Blue' ? '#0000ff' : 'transparent', 
								color: allianceColor === AllianceColor.blue ? 'white' : 'orange',
								width: '135px',
								height: '35px',
								borderRadius: '5px',
								marginBottom: '15px'
							 }}
							onClick={() => setAllianceColor(AllianceColor.blue)}
						>
							Blue Alliance
						</ToggleButton>
					</ToggleButtonGroup>
				</div>
				<h1 className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Auto</h1>
				<h2 className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Move</h2>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<ToggleButtonGroup
						id='move'
						value={ move }
						exclusive
						onChange={ (event, newValue) => setMove(newValue) }
						aria-label='move'
						style={{ gap: '10px' }}
						defaultValue={Move.no}
					>
						<ToggleButton 
							value='No' 
							aria-label='no move' 
							selected={move === 'No'}
							style={{ 
								backgroundColor: move ===  'No' ? '#fe5000' : 'transparent', 
								color: move === 'No' ? 'white' : 'orange',
								width: '75px',
								height: '35px',
								borderRadius: '5px',
								marginBottom: '15px'
							}}
							onClick={() => setMove(Move.no)}
						>
							No
						</ToggleButton>
						<ToggleButton 
							value='Yes' 
							aria-label='yes move' 
							selected={move === 'Yes'}
							style={{ 
								backgroundColor: move ===  'Yes' ? '#fe5000' : 'transparent', 
								color: move === 'Yes' ? 'white' : 'orange',
								width: '75px',
								height: '35px',
								borderRadius: '5px'
							}}
							onClick={() => setMove(Move.yes)}
						>
							Yes
						</ToggleButton>
					</ToggleButtonGroup>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setCoralL4(coralL4 - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='coral-l4'
						label='Coral Level 4'
						name='coralL4'
						type='number'
						margin='dense'
						variant='outlined'
						value={ coralL4 }
						onChange={ (event) => setCoralL4(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setCoralL4(coralL4 + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setCoralL3(coralL3 - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='coral-l3'
						label='Coral Level 3'
						name='coralL3'
						type='number'
						margin='dense'
						variant='outlined'
						value={ coralL3 }
						onChange={ (event) => setCoralL3(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center', appearance: 'none' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setCoralL3(coralL3 + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setCoralL2(coralL2 - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='coral-l2'
						label='Coral Level 2'
						name='coralL2'
						type='number'
						margin='dense'
						variant='outlined'
						value={ coralL2 }
						onChange={ (event) => setCoralL2(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setCoralL2(coralL2 + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setCoralL1(coralL1 - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='coral-l1'
						label='Coral Level 1'
						name='coralL1'
						type='number'
						margin='dense'
						variant='outlined'
						value={ coralL1 }
						onChange={ (event) => setCoralL1(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setCoralL1(coralL1 + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setAlgeRem(algeRem - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='alge-rem'
						label='Alge Rem'
						name='algeRem'
						type='number'
						margin='dense'
						variant='outlined'
						value={ algeRem }
						onChange={ (event) => setAlgeRem(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setAlgeRem(algeRem + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setProcess(process - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='process'
						label='Process'
						name='process'
						type='number'
						margin='dense'
						variant='outlined'
						value={ process }
						onChange={ (event) => setProcess(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setProcess(process + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setNet(net - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='net'
						label='Net'
						name='net'
						type='number'
						margin='dense'
						variant='outlined'
						value={ net }
						onChange={ (event) => setNet(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setNet(net + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<h1 className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Teleop</h1>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setCoralL4Teleop(coralL4Teleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='coral-l4-teleop'
						label='Coral Level 4'
						name='coralL4Teleop'
						type='number'
						margin='dense'
						variant='outlined'
						value={ coralL4Teleop }
						onChange={ (event) => setCoralL4Teleop(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setCoralL4Teleop(coralL4Teleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setCoralL3Teleop(coralL3Teleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='coral-l3-teleop'
						label='Coral Level 3'
						name='coralL3Teleop'
						type='number'
						margin='dense'
						variant='outlined'
						value={ coralL3Teleop }
						onChange={ (event) => setCoralL3Teleop(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setCoralL3Teleop(coralL3Teleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setCoralL2Teleop(coralL2Teleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='coral-l2-teleop'
						label='Coral Level 2'
						name='coralL2Teleop'
						type='number'
						margin='dense'
						variant='outlined'
						value={ coralL2Teleop }
						onChange={ (event) => setCoralL2Teleop(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setCoralL2Teleop(coralL2Teleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setCoralL1Teleop(coralL1Teleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='coral-l1-teleop'
						label='Coral Level 1'
						name='coralL1Teleop'
						type='number'
						margin='dense'
						variant='outlined'
						value={ coralL1Teleop }
						onChange={ (event) => setCoralL1Teleop(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setCoralL1Teleop(coralL1Teleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setAlgeRemTeleop(algeRemTeleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='alge-rem-teleop'
						label='Alge Rem'
						name='algeRemTeleop'
						type='number'
						margin='dense'
						variant='outlined'
						value={ algeRemTeleop }
						onChange={ (event) => setAlgeRemTeleop(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setAlgeRemTeleop(algeRemTeleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setProcessTeleop(processTeleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='process-teleop'
						label='Process'
						name='processTeleop'
						type='number'
						margin='dense'
						variant='outlined'
						value={ processTeleop }
						onChange={ (event) => setProcessTeleop(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setProcessTeleop(processTeleop + 1) } style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button type="button" onClick={() => setNetTeleop(netTeleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<TextField
						id='net-teleop'
						label='Net'
						name='netTeleop'
						type='number'
						margin='dense'
						variant='outlined'
						value={ netTeleop }
						onChange={ (event) => setNetTeleop(Number(event.target.value)) }
						slotProps={{
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 99,
								style: { MozAppearance: 'textfield', color: '#FAF9F6' }
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
						style={{ padding: '0 10px',
							marginBottom: '15px' }}
						InputLabelProps={{
							style: { color: ' #FAF9F6' }
						}}
					/>
					<button type="button" onClick={() => setNetTeleop(netTeleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<h2 className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>Climb</h2>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<ToggleButtonGroup
						id='climb'
						value={ climb }
						exclusive
						onChange={ (event, newValue) => setClimb(newValue) }
						aria-label='climb'
						style={{ gap: '10px' }}
					>
						<ToggleButton
							value='None'
							aria-label='no climb'
							selected={climb === 'None'}
							style={{ backgroundColor: climb ===  'None' ? '#fe5000' : 'transparent', color: climb === 'None' ? 'white' : 'orange', 								
								width: '75px',
								height: '35px',
								borderRadius: '5px',
								marginBottom: '15px' }}
							onClick={() => setClimb(Climb.none)}
						>
							None
						</ToggleButton>
						<ToggleButton
							value='Park'
							aria-label='park climb'
							selected={climb === 'Park'}
							style={{ backgroundColor: climb ===  'Park' ? '#fe5000' : 'transparent', color: climb === 'Park' ? 'white' : 'orange', 								
								width: '75px',
								height: '35px',
								borderRadius: '5px' }}
							onClick={() => setClimb(Climb.park)}
						>
							Park
						</ToggleButton>
						<ToggleButton
							value='Shallow'
							aria-label='shallow climb'
							selected={climb === 'Shallow'}
							style={{ backgroundColor: climb ===  'Shallow' ? '#fe5000' : 'transparent', color: climb === 'Shallow' ? 'white' : 'orange', 								
								width: '75px',
								height: '35px',
								borderRadius: '5px' }}
							onClick={() => setClimb(Climb.shallow)}
						>
							Shallow
						</ToggleButton>
						<ToggleButton
							value='Deep'
							aria-label='deep climb'
							selected={climb === 'Deep'}
							style={{ backgroundColor: climb === 'Deep' ? '#fe5000' : 'transparent', color: climb === 'Deep' ? 'white' : 'orange', 								
								width: '75px',
								height: '35px',
								borderRadius: '5px' }}
							onClick={() => setClimb(Climb.deep)}
						>
							Deep
						</ToggleButton>
					</ToggleButtonGroup>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button
						type='button'
						className='back-button'
						onClick={() => window.location.href = '/'}
						style={{ 
							backgroundColor: 'transparent', 
							color: '#fe5000', 
							fontSize: '1em', 
							width: '75px',
							height: '35px',
							borderRadius: '5px',
							border: '#fe5000 1px solid',
							marginRight: '10px',
							marginTop: '40px',
							cursor: 'pointer'
						}}
					>
						Back
					</button>
					<button
						type='submit'
						className='submit-button'
						onClick={ handleSubmit }
						disabled={ !isValid }
						style={{ 
							backgroundColor: isValid ? '#fe5000' : 'grey', 
							color: 'white', 
							fontSize: '1em', 
							width: '75px',
							height: '35px',
							borderRadius: '5px',
							border: 'none',
							marginTop: '40px',
							cursor: isValid ? 'pointer' : 'not-allowed'
						}}
					>
						Submit
					</button>
				</div>
			</form>
		</main>
	);
}