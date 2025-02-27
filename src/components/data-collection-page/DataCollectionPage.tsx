import './DataCollectionPage.scss';
import { AllianceColor, Move, Climb, IUser, ITeam, IAuto, ITeleop, IMatch, Gamemode } from '../../model/Models.ts';
import { useEffect, useState } from 'react';
import { TextField, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';

interface IProps {
	user: IUser;
	handleDataCollection: (user: ITeam) => void;
	handleAuto: (auto: IAuto) => void;
	handleTeleop: (teleop: ITeleop) => void;
	submitMatchData: (submitMatchData: IMatch) => void;
}

export default function DataCollectionPage(props: IProps) {
	const [ scoutTeamNumber, setScoutTeamNumber ] = useState<string>('');
	const [ matchNumber, setMatchNumber ] = useState<string>('');
	const [ allianceColor, setAllianceColor ] = useState<AllianceColor>(AllianceColor.unknown);

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
				{ gamemode: Gamemode.auto, objective: 'MOBILITY_2025', count: move },
				{ gamemode: Gamemode.auto, objective: 'CORAL_FOUR_2025', count: coralL4 },
				{ gamemode: Gamemode.auto, objective: 'CORAL_THREE_2025', count: coralL3 },
				{ gamemode: Gamemode.auto, objective: 'CORAL_TWO_2025', count: coralL2 },
				{ gamemode: Gamemode.auto, objective: 'CORAL_ONE_2025', count: coralL1 },
				{ gamemode: Gamemode.auto, objective: 'ALGAE_REM_2025', count: algeRem },
				{ gamemode: Gamemode.auto, objective: 'LOW_GOAL_2025', count: process },
				{ gamemode: Gamemode.auto, objective: 'HIGH_GOAL_2025', count: net },

				{ gamemode: Gamemode.teleop, objective: 'CORAL_FOUR_2025', count: coralL4Teleop },
				{ gamemode: Gamemode.teleop, objective: 'CORAL_THREE_2025', count: coralL3Teleop },
				{ gamemode: Gamemode.teleop, objective: 'CORAL_TWO_2025', count: coralL2Teleop },
				{ gamemode: Gamemode.teleop, objective: 'CORAL_ONE_2025', count: coralL1Teleop },
				{ gamemode: Gamemode.teleop, objective: 'ALGAE_REM_2025', count: algeRemTeleop },
				{ gamemode: Gamemode.teleop, objective: 'LOW_GOAL_2025', count: processTeleop },
				{ gamemode: Gamemode.teleop, objective: 'HIGH_GOAL_2025', count: netTeleop },
				{ gamemode: Gamemode.teleop, objective: 'CLIMB_2025', count: Number(climb) },
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

	return (
		<main className="data-collection-page">
			<form
				className='data-collection-form'
				onSubmit={ handleSubmit }
				aria-labelledby='data-collection-form-header'
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			>
				<div className="header">
					<div className="logo">
						<img src="logos/192-pwa.png" alt="2338 logo" height="100rem"/>
					</div>
					<div className="analytics">
						<Button sx={{ m: 0.5 }} variant="contained" href="https://data.gearitforward.com/">Analytics</Button>
					</div>
				</div>
				<div className="coral-level-container">
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
				<div className="coral-level-container" >
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
				<div className="coral-level-container" >
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
				<h1 className="coral-level-container" >Auto</h1>
				<h2 className="coral-level-container" >Move</h2>
				<div className="coral-level-container" >
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
							value={ Move.no }
							aria-label='no move' 
							selected={move === Move.no}
							style={{ 
								backgroundColor: move === Move.no ? '#fe5000' : 'transparent', 
								color: move === Move.no ? 'white' : 'orange',
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
							value={ Move.yes }
							aria-label='yes move' 
							selected={move === Move.yes}
							style={{ 
								backgroundColor: move === Move.yes ? '#fe5000' : 'transparent', 
								color: move === Move.yes ? 'white' : 'orange',
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
				<div className='counter-names'>
					Coral Level 4
				</div>
				<div className="coral-level-container-white" >
					<button type="button" onClick={() => coralL4 > 0 && setCoralL4(coralL4 - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{coralL4}
					</div>
					<button type="button" onClick={() => setCoralL4(coralL4 + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Coral Level 3
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() => coralL3 > 0 && setCoralL3(coralL3 - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{coralL3}
					</div>
					<button type="button" onClick={() => setCoralL3(coralL3 + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Coral Level 2
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() =>  coralL2 > 0 && setCoralL2(coralL2 - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{coralL2}
					</div>
					<button type="button" onClick={() => setCoralL2(coralL2 + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Coral Level 1
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() =>  coralL1 > 0 && setCoralL1(coralL1 - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{coralL1}
					</div>
					<button type="button" onClick={() => setCoralL1(coralL1 + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Algae Rem
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() =>  algeRem > 0 && setAlgeRem(algeRem - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{algeRem}
					</div>
					<button type="button" onClick={() => setAlgeRem(algeRem + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Processor
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() =>  process > 0 && setProcess(process - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{process}
					</div>
					<button type="button" onClick={() => setProcess(process + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Net
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() =>  net > 0 && setNet(net - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{net}
					</div>
					<button type="button" onClick={() => setNet(net + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<h1 className="coral-level-container" >Teleop</h1>

				<div className='counter-names'>
					Coral Level 4
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() =>  coralL4Teleop > 0 && setCoralL4Teleop(coralL4Teleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{coralL4Teleop}
					</div>
					<button type="button" onClick={() => setCoralL4Teleop(coralL4Teleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Coral Level 3
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() => coralL3Teleop > 0 && setCoralL3Teleop(coralL3Teleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{coralL3Teleop}
					</div>
					<button type="button" onClick={() => setCoralL3Teleop(coralL3Teleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>
				<div className='counter-names'>
					Coral Level 2
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() => coralL2Teleop > 0 && setCoralL2Teleop(coralL2Teleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{coralL2Teleop}
					</div>
					<button type="button" onClick={() => setCoralL2Teleop(coralL2Teleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Coral Level 1
				</div>
				<div className="coral-level-container" >
					<button type="button" onClick={() => coralL1Teleop > 0 && setCoralL1Teleop(coralL1Teleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{coralL1Teleop}
					</div>
					<button type="button" onClick={() => setCoralL1Teleop(coralL1Teleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Algae Rem
				</div>
				<div className='coral-level-container'>
					<button type="button" onClick={() => algeRemTeleop > 0 && setAlgeRemTeleop(algeRemTeleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{algeRemTeleop}
					</div>
					<button type="button" onClick={() => setAlgeRemTeleop(algeRemTeleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				</div>

				<div className='counter-names'>
					Processor
				</div>
				<div className='coral-level-container'>
					<button type="button" onClick={() => processTeleop > 0 && setProcessTeleop(processTeleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{processTeleop}
					</div>
					<button type="button" onClick={() => setProcessTeleop(processTeleop + 1) } style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>
				
				</div>
				<div className='counter-names'>
					Net
				</div>
				<div className='coral-level-container'>
					<button type="button" onClick={() => netTeleop > 0 && setNetTeleop(netTeleop - 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>-</button>
					<div style={{ padding: '0 5px', marginBottom: '15px', color: '#FAF9F6', textAlign: 'center', width: '85px', height: '35px', lineHeight: '35px' }}>
        				{netTeleop}
					</div>
					<button type="button" onClick={() => setNetTeleop(netTeleop + 1)} style={{ color: 'white', background: '#fe5000', height: '35px', borderRadius: '5px', borderColor: 'transparent', width: '55px' }}>+</button>

				</div>
				
				<h2 className="climb-name" >Climb</h2>	
				<div className="coral-level-container" >
					<ToggleButtonGroup
						id='climb'
						value={ climb }
						exclusive
						onChange={ (event, newValue) => setClimb(newValue) }
						aria-label='climb'
						style={{ gap: '10px' }}
					>
						<ToggleButton
							value={ Climb.none }
							aria-label='no climb'
							selected={climb === Climb.none}
							style={{ backgroundColor: climb === Climb.none ? '#fe5000' : 'transparent', color: climb === Climb.none ? 'white' : 'orange', 								
								width: '75px',
								height: '35px',
								borderRadius: '5px',
								marginBottom: '15px' }}
							onClick={() => setClimb(Climb.none)}
						>
							None
						</ToggleButton>
						<ToggleButton
							value={ Climb.park }
							aria-label='park climb'
							selected={climb === Climb.park}
							style={{ backgroundColor: climb === Climb.park ? '#fe5000' : 'transparent', color: climb === Climb.park ? 'white' : 'orange', 								
								width: '75px',
								height: '35px',
								borderRadius: '5px' }}
							onClick={() => setClimb(Climb.park)}
						>
							Park
						</ToggleButton>
						<ToggleButton
							value={ Climb.shallow }
							aria-label='shallow climb'
							selected={climb === Climb.shallow}
							style={{ backgroundColor: climb === Climb.shallow ? '#fe5000' : 'transparent', color: climb === Climb.shallow ? 'white' : 'orange', 								
								width: '75px',
								height: '35px',
								borderRadius: '5px' }}
							onClick={() => setClimb(Climb.shallow)}
						>
							Shallow
						</ToggleButton>
						<ToggleButton
							value={ Climb.deep }
							aria-label='deep climb'
							selected={climb === Climb.deep}
							style={{ backgroundColor: climb === Climb.deep ? '#fe5000' : 'transparent', color: climb === Climb.deep ? 'white' : 'orange', 								
								width: '75px',
								height: '35px',
								borderRadius: '5px' }}
							onClick={() => setClimb(Climb.deep)}
						>
							Deep
						</ToggleButton>
					</ToggleButtonGroup>
				</div>
				<div className="coral-level-container" >
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