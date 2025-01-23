import './DataCollectionPage.scss';
import { AllianceColor, Move, Climb, IUser, ITeam, IAuto, ITeleop } from '../../model/Models.ts';
import { useEffect, useState } from 'react';
import { InputAdornment, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

interface IProps {
	user: IUser;
	handleDataCollection: (user: ITeam) => void;
	handleAuto: (auto: IAuto) => void;
	handleTeleop: (teleop: ITeleop) => void;
}

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
	const [climb, setClimb] = useState<Climb>(Climb.none);

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
		&& coralL4 >= 0
		&& coralL3 >= 0
		&& coralL2 >= 0
		&& coralL1 >= 0
		&& algeRem >= 0
		&& process >= 0
		&& net >= 0

		&& coralL4Teleop >= 0
		&& coralL3Teleop >= 0
		&& coralL2Teleop >= 0
		&& coralL1Teleop >= 0
		&& algeRemTeleop >= 0
		&& processTeleop >= 0
		&& netTeleop >= 0
		&& climb !== Climb.none
	);

	const handleSubmit = (event): void => {
		event.preventDefault();
		if (!isValid) {
			return;
		}

		localStorage.setItem('scoutTeamNumber', scoutTeamNumber);
		localStorage.setItem('matchNumber', matchNumber);
		localStorage.setItem('allianceColor', allianceColor);

		localStorage.setItem('move', move);
		localStorage.setItem('coralL4', coralL4.toString());
		localStorage.setItem('coralL3', coralL3.toString());
		localStorage.setItem('coralL2', coralL2.toString());
		localStorage.setItem('coralL1', coralL1.toString());
		localStorage.setItem('algeRem', algeRem.toString());
		localStorage.setItem('process', process.toString());
		localStorage.setItem('net', net.toString());

		localStorage.setItem('coralL4Teleop', coralL4Teleop.toString());
		localStorage.setItem('coralL3Teleop', coralL3Teleop.toString());
		localStorage.setItem('coralL2Teleop', coralL2Teleop.toString());
		localStorage.setItem('coralL1Teleop', coralL1Teleop.toString());
		localStorage.setItem('algeRemTeleop', algeRemTeleop.toString());
		localStorage.setItem('processTeleop', processTeleop.toString());
		localStorage.setItem('netTeleop', netTeleop.toString());
		localStorage.setItem('climb', climb);

		props.handleDataCollection({
			scoutTeamNumber: scoutTeamNumber,
			matchNumber: matchNumber,
			allianceColor: allianceColor
		});

		props.handleAuto({
			Move: move,
			CoralL4: coralL4,
			CoralL3: coralL3,
			CoralL2: coralL2,
			CoralL1: coralL1,
			AlgeRem: algeRem,
			Process: process,
			Net: net
		});

		props.handleTeleop({
			CoralL4Teleop: coralL4Teleop,
			CoralL3Teleop: coralL3Teleop,
			CoralL2Teleop: coralL2Teleop,
			CoralL1Teleop: coralL1Teleop,
			AlgeRemTeleop: algeRemTeleop,
			ProcessTeleop: processTeleop,
			NetTeleop: netTeleop,
			Climb: climb
		});
	};

	return (
		<main className="page data-collection-page">
			<form
				className='data-collection-form'
				onSubmit={ handleSubmit }
				aria-labelledby='data-collection-form-header'
			>
				<TextField
					id='scout-team-number'
					label='Scouted Team Number'
					name='scoutTeamNumber'
					type='number'
					margin='dense'
					variant='outlined'
					value={ scoutTeamNumber }
					onChange={ (event) => setScoutTeamNumber(event.target.value) }
					slotProps={{
						input: {
							startAdornment: <InputAdornment position='start'>#</InputAdornment>
						},
						htmlInput:
						{
							min: 0,
							max: 99999
						}
					}}
					autoComplete="off"
					autoFocus={true}
				/>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center' }}>
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
							input: {
								startAdornment: <InputAdornment position='start'>#</InputAdornment>
							},
							htmlInput:
							{
								min: 0,
								max: 999
							}
						}}
						autoComplete="off"
					/>
				</div>
				<ToggleButtonGroup
					id='alliance-color'
					value={ allianceColor }
					exclusive
					onChange={ (event, newValue) => setAllianceColor(newValue) }
					aria-label='alliance color'
					style={{ gap: '10px' }}
				>
					<ToggleButton 
						value='Blue' 
						aria-label='blue alliance' 
						selected={allianceColor === 'Blue'}
						style={{ backgroundColor: allianceColor === 'Blue' ? '#ccccff' : 'blue', color: 'black' }}
						onClick={() => setAllianceColor(AllianceColor.blue)}
					>
						Blue
					</ToggleButton>
					<ToggleButton 
						value='Red' 
						aria-label='red alliance' 
						selected={allianceColor === 'Red'}
						style={{ backgroundColor: allianceColor === 'Red' ? '#ffcccc' : 'red', color: 'black' }}
						onClick={() => setAllianceColor(AllianceColor.red)}
					>
						Red
					</ToggleButton>
				</ToggleButtonGroup>
				<h1>Auto</h1>
				<h2>Move</h2>
				<ToggleButtonGroup
					id='move'
					value={ move }
					exclusive
					onChange={ (event, newValue) => setMove(newValue) }
					aria-label='move'
					style={{ gap: '10px' }}
				>
					<ToggleButton 
						value='Yes' 
						aria-label='yes move' 
						selected={move === 'Yes'}
						style={{ 
							backgroundColor: move === 'Yes' ? '#ffcc99' : 'orange', 
							color: 'black',
							flex: 1
						}}
						onClick={() => setMove(Move.yes)}
					>
						Yes
					</ToggleButton>
					<ToggleButton 
						value='No' 
						aria-label='no move' 
						selected={move === 'No'}
						style={{ 
							backgroundColor: move === 'No' ? '#ffcc99' : 'orange', 
							color: 'black',
							flex: 1
						}}
						onClick={() => setMove(Move.no)}
					>
						No
					</ToggleButton>
				</ToggleButtonGroup>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center' }}>
					<button type="button" onClick={() => setCoralL4(coralL4 - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setCoralL4(coralL4 + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setCoralL3(coralL3 - 1)}>&#9664;</button>
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
								max: 99
							}
							
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setCoralL3(coralL3 + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setCoralL2(coralL2 - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setCoralL2(coralL2 + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setCoralL1(coralL1 - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setCoralL1(coralL1 + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setAlgeRem(algeRem - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setAlgeRem(algeRem + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setProcess(process - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setProcess(process + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setNet(net - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setNet(net + 1)}>&#9654;</button>
				</div>
				<h1>Teleop</h1>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center' }}>
					<button type="button" onClick={() => setCoralL4Teleop(coralL4Teleop - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setCoralL4Teleop(coralL4Teleop + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setCoralL3Teleop(coralL3Teleop - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setCoralL3Teleop(coralL3Teleop + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setCoralL2Teleop(coralL2Teleop - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setCoralL2Teleop(coralL2Teleop + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setCoralL1Teleop(coralL1Teleop - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setCoralL1Teleop(coralL1Teleop + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setAlgeRemTeleop(algeRemTeleop - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setAlgeRemTeleop(algeRemTeleop + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setProcessTeleop(processTeleop - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setProcessTeleop(processTeleop + 1)}>&#9654;</button>
				</div>
				<div className="coral-level-container" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
					<button type="button" onClick={() => setNetTeleop(netTeleop - 1)}>&#9664;</button>
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
								max: 99
							}
						}}
						autoComplete="off"
						InputProps={{
							inputProps: { style: { textAlign: 'center' } },
							endAdornment: null
						}}
					/>
					<button type="button" onClick={() => setNetTeleop(netTeleop + 1)}>&#9654;</button>
				</div>
				<h2>Climb</h2>
				<div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
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
							style={{ backgroundColor: climb === 'None' ? '#ffcc99' : 'orange', color: 'black' }}
							onClick={() => setClimb(Climb.none)}
						>
							None
						</ToggleButton>
						<ToggleButton
							value='Park'
							aria-label='park climb'
							selected={climb === 'Park'}
							style={{ backgroundColor: climb === 'Park' ? '#ffcc99' : 'orange', color: 'black' }}
							onClick={() => setClimb(Climb.park)}
						>
							Park
						</ToggleButton>
						<ToggleButton
							value='Shallow'
							aria-label='shallow climb'
							selected={climb === 'Shallow'}
							style={{ backgroundColor: climb === 'Shallow' ? '#ffcc99' : 'orange', color: 'black' }}
							onClick={() => setClimb(Climb.shallow)}
						>
							Shallow
						</ToggleButton>
						<ToggleButton
							value='Deep'
							aria-label='deep climb'
							selected={climb === 'Deep'}
							style={{ backgroundColor: climb === 'Deep' ? '#ffcc99' : 'orange', color: 'black' }}
							onClick={() => setClimb(Climb.deep)}
						>
							Deep
						</ToggleButton>
					</ToggleButtonGroup>
				</div>
			</form>
		</main>
	);
}