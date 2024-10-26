export type GamePhase = 'banning' | 'picking' | 'post-pick' | 'set-end';
export type Player = 1 | 2;

export interface Stage {
	id: number;
	name: string;
	logo: string;
}

export interface GameState {
	currentStageList: Stage[];
	bannedStages: Array<{ id: number; name: string; bannedBy: number }>;
	currentBanningPlayer: number | null;
	currentGame: number;
	currentBanCount: number;
	gamePhase: GamePhase;
	player1Wins: number;
	player2Wins: number;
	selectedStage: Stage | null;
}
