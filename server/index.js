const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(
	cors({
		origin: 'https://picker.lunacity.be',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization']
	})
);

const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: '*'
	}
});

const startingStageList = [
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

let gameState = {
	currentStageList: [...startingStageList],
	bannedStages: [],
	rpsWinner: null,
	currentGame: 1,
	currentBanCount: 0,
	gamePhase: 'banning', // 'banning', 'picking', 'post-pick'
	player1Wins: 0,
	player2Wins: 0
};

function calculateBanningPlayer() {
	if (gameState.currentGame === 1) {
		return gameState.currentBanCount < 3 ? gameState.rpsWinner : gameState.rpsWinner === 1 ? 2 : 1;
	}
	return gameState.rpsWinner;
}

function resetGame() {
	gameState.currentStageList = [...startingStageList];
	gameState.bannedStages = [];
	gameState.currentBanCount = 0;
	gameState.gamePhase = 'banning';
}

function resetSet() {
	resetGame();
	gameState.currentGame = 1;
	gameState.rpsWinner = null;
	gameState.player1Wins = 0;
	gameState.player2Wins = 0;
}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('A user connected:', socket.id);

	socket.on('rockPaperScissors', (winner) => {
		gameState.rpsWinner = winner;
		io.emit('gameState', gameState);
	});

	socket.on('banStage', (data) => {
		const { stageId, player } = data;

		if (gameState.gamePhase !== 'banning' || player !== calculateBanningPlayer()) {
			socket.emit('error', 'Invalid ban attempt');
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
			}

			io.emit('gameState', gameState);
		}
	});

	socket.on('pickStage', (stageId) => {
		if (gameState.gamePhase !== 'picking') {
			socket.emit('error', 'Invalid pick attempt');
			return;
		}

		const pickedStage = gameState.currentStageList.find((stage) => stage.id === stageId);
		if (pickedStage) {
			console.log(`Stage picked: ${pickedStage.name}`);
			gameState.gamePhase = 'post-pick';
			io.emit('gameState', gameState);
		}
	});

	socket.on('setWinner', (player) => {
		if (gameState.gamePhase !== 'post-pick') {
			socket.emit('error', 'Invalid winner set attempt');
			return;
		}

		if (player === 1) {
			gameState.player1Wins++;
		} else {
			gameState.player2Wins++;
		}

		if (gameState.player1Wins === 3 || gameState.player2Wins === 3) {
			gameState.gamePhase = 'set-end';
		} else {
			gameState.currentGame++;
			resetGame();
		}

		gameState.rpsWinner = player; // Set the winner as the first to ban in the next game
		io.emit('gameState', gameState);
	});

	socket.on('reset', () => {
		resetSet();
		io.emit('gameState', gameState);
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected:', socket.id);
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
