
export interface IUser {
	scouterName: string;
	teamNumber: number;
	eventCode: string;
	secretCode: string;
}

export interface IMatchLineup {
	matchNumber: number;
	red1: number;
	red2: number;
	red3: number;
	blue1: number;
	blue2: number;
	blue3: number;
}

export enum Move {
	yes = 3,
	no = 0,
	unknown = 1
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