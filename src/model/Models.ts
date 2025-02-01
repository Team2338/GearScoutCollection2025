
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
	yes = 'Yes',
	no = 'No',
	unknown = 'Unknown'
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

export enum Climb {
	unknown = 'Unknown',
	none = 'None',
	park = 'Park',
	shallow = 'Shallow',
	deep = 'Deep'
}

export enum AllianceColor {
	red = 'Red',
	blue = 'Blue',
	unknown = 'Unknown'
}