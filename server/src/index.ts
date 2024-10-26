import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

interface Stage {
	id: number;
	name: string;
}

interface GameState {
	currentStageList: Stage[];
	bannedStages: Array<{ id: number; name: string; bannedBy: number }>;
	currentBanningPlayer: number | null;
	currentGame: number;
	currentBanCount: number;
	gamePhase: 'banning' | 'picking' | 'post-pick' | 'set-end';
	player1Wins: number;
	player2Wins: number;
	initialBanningPlayer: number | null;
	selectedStage: Stage | null;
}

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
	cors: {
		origin: 'https://picker.lunacity.be', // Update this to match your Svelte app's URL
		methods: ['GET', 'POST']
	}
});

// Initial stage list
const startingStageList: Stage[] = [
	{ id: 1, name: 'battlefield' },
	{ id: 2, name: 'small battlefield' },
	{ id: 3, name: 'final destination' },
	{ id: 4, name: 'pokemon stadium 2' },
	{ id: 5, name: 'hollow bastion' },
	{ id: 6, name: 'smashville' },
	{ id: 7, name: 'town and city' },
	{ id: 8, name: 'kalos pokemon league' },
	{ id: 9, name: "yoshi's story" }
];

// Initial game state
const getInitialGameState = (): GameState => ({
	currentStageList: [...startingStageList],
	bannedStages: [],
	currentBanningPlayer: null,
	initialBanningPlayer: null,
	currentGame: 1,
	currentBanCount: 0,
	gamePhase: 'banning',
	player1Wins: 0,
	player2Wins: 0,
	selectedStage: null
});

let gameState = getInitialGameState();
const calculateBanningPlayer = () => {
	if (gameState.currentGame === 1) {
		// First banning player bans 3 stages, then switches to the other player for 4 bans
		if (gameState.currentBanCount < 3) {
			return gameState.initialBanningPlayer;
		} else if (gameState.currentBanCount < 7) {
			return gameState.initialBanningPlayer === 1 ? 2 : 1;
		}
	}
	return gameState.currentBanningPlayer;
};

const calculatePickingPlayer = () => {
	if (gameState.currentGame === 1) {
		// In game 1, the picking player is the one who banned first
		return gameState.initialBanningPlayer;
	} else {
		// In subsequent games, the picking player is the opposite of the banning player
		return gameState.currentBanningPlayer === 1 ? 2 : 1;
	}
};

io.on('connection', (socket) => {
	console.log('Client connected:', socket.id);
	console.log(gameState);
	// Send initial game state to newly connected client
	socket.emit('gameState', gameState);

	socket.on('requestState', () => {
		socket.emit('gameState', gameState);
	});

	socket.on('rockPaperScissors', (winner: number) => {
		console.log('winner here');
		gameState.currentBanningPlayer = winner;
		gameState.initialBanningPlayer = winner;
		io.emit('gameState', gameState);
	});

	socket.on('banStage', ({ stageId, player }: { stageId: number; player: number }) => {
		if (gameState.gamePhase !== 'banning' || player !== calculateBanningPlayer()) {
			console.log('not your turn to ban');
			return;
		}

		const stageIndex = gameState.currentStageList.findIndex((stage) => stage.id === stageId);
		if (stageIndex !== -1) {
			const bannedStage = gameState.currentStageList.splice(stageIndex, 1)[0];
			gameState.bannedStages.push({ ...bannedStage, bannedBy: player });
			gameState.currentBanCount++;

			if (
				(gameState.currentGame === 1 && gameState.currentBanCount === 7) ||
				(gameState.currentGame > 1 && gameState.currentBanCount === 3)
			) {
				gameState.gamePhase = 'picking';
				gameState.currentBanningPlayer = calculatePickingPlayer();
			}

			io.emit('gameState', gameState);
		}
	});

	socket.on('pickStage', (stageId: number) => {
		if (gameState.gamePhase !== 'picking') {
			socket.emit('error', 'Invalid pick attempt');
			return;
		}

		const pickedStage = gameState.currentStageList.find((stage) => stage.id === stageId);
		if (pickedStage) {
			gameState.gamePhase = 'post-pick';
			gameState.selectedStage = pickedStage;
			io.emit('gameState', gameState);
		}
	});

	socket.on('setWinner', (player: number) => {
		if (gameState.gamePhase !== 'post-pick') {
			socket.emit('error', 'Invalid winner set attempt');
			return;
		}
		console.log(player === 1);

		if (player === 1) {
			gameState.player1Wins++;
		} else {
			gameState.player2Wins++;
		}

		if (gameState.player1Wins === 3 || gameState.player2Wins === 3) {
			io.emit('gameOver');
			gameState = getInitialGameState();
		} else {
			gameState.currentGame++;
			gameState.currentStageList = [...startingStageList];
			gameState.bannedStages = [];
			gameState.currentBanCount = 0;
			gameState.gamePhase = 'banning';

			gameState.currentBanningPlayer = player;
		}

		io.emit('gameState', gameState);
	});

	socket.on('reset', () => {
		gameState = getInitialGameState();
		io.emit('gameState', gameState);
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected:', socket.id);
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
