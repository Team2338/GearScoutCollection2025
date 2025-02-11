
export interface IUser {
	scouterName: string;
	teamNumber: number;
	eventCode: string;
	secretCode: string;
}

export interface ITeam {
	scoutTeamNumber: string;
	matchNumber: string;
	allianceColor: string;
}

export interface IAuto {
	Move: string;
	CoralL4: number;
	CoralL3: number;
	CoralL2: number;
	CoralL1: number;
	AlgeRem: number;
	Process: number;
	Net: number;
}

export enum Move {
	yes = 3,
	no = 0,
	unknown = 1
}

export interface ITeleop {
	CoralL4Teleop: number;
	CoralL3Teleop: number;
	CoralL2Teleop: number;
	CoralL1Teleop: number;
	AlgeRemTeleop: number;
	ProcessTeleop: number;
	NetTeleop: number;
	Climb: string;
}

export interface IMatch {
	gameYear: number;
	eventCode: string;
	matchNumber: string;
	robotNumber: string;
	creator: string;
	allianceColor: string;
	objectives: IObjective[];
}

export interface IObjective {
	gamemode: Gamemode,
	objective: string;
	count: number;
	list?: number[];
}

export enum Climb {
	unknown = 1,
	none = 0,
	park = 2,
	shallow = 6,
	deep = 12
}

export enum AllianceColor {
	red = 'Red',
	blue = 'Blue',
	unknown = 'Unknown'
}

export enum Gamemode {
	teleop = 'TELEOP',
	auto = 'AUTO'
}