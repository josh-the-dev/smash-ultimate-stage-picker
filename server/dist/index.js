"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'https://picker.lunacity.be', // Update this to match your Svelte app's URL
        methods: ['GET', 'POST']
    }
});
// Initial stage list
const startingStageList = [
    { id: 1, name: 'Battlefield' },
    { id: 2, name: 'Small Battlefield' },
    { id: 3, name: 'Final Destination' },
    { id: 4, name: 'Pokemon Stadium 2' },
    { id: 5, name: 'Hollow Bastion' },
    { id: 6, name: 'Smashville' },
    { id: 7, name: 'Town & City' },
    { id: 8, name: 'Kalos Pokemon League' },
    { id: 9, name: "Yoshi's Story" }
];
// Initial game state
const getInitialGameState = () => ({
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
        }
        else if (gameState.currentBanCount < 7) {
            return gameState.initialBanningPlayer === 1 ? 2 : 1;
        }
    }
    return gameState.currentBanningPlayer;
};
const calculatePickingPlayer = () => {
    if (gameState.currentGame === 1) {
        // In game 1, the picking player is the one who banned first
        return gameState.initialBanningPlayer;
    }
    else {
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
    socket.on('rockPaperScissors', (winner) => {
        console.log('winner here');
        gameState.currentBanningPlayer = winner;
        gameState.initialBanningPlayer = winner;
        io.emit('gameState', gameState);
    });
    socket.on('banStage', ({ stageId, player }) => {
        if (gameState.gamePhase !== 'banning' || player !== calculateBanningPlayer()) {
            console.log('not your turn to ban');
            return;
        }
        const stageIndex = gameState.currentStageList.findIndex((stage) => stage.id === stageId);
        if (stageIndex !== -1) {
            const bannedStage = gameState.currentStageList.splice(stageIndex, 1)[0];
            gameState.bannedStages.push(Object.assign(Object.assign({}, bannedStage), { bannedBy: player }));
            gameState.currentBanCount++;
            if ((gameState.currentGame === 1 && gameState.currentBanCount === 7) ||
                (gameState.currentGame > 1 && gameState.currentBanCount === 3)) {
                gameState.gamePhase = 'picking';
                gameState.currentBanningPlayer = calculatePickingPlayer();
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
            gameState.gamePhase = 'post-pick';
            gameState.selectedStage = pickedStage;
            io.emit('gameState', gameState);
        }
    });
    socket.on('setWinner', (player) => {
        if (gameState.gamePhase !== 'post-pick') {
            socket.emit('error', 'Invalid winner set attempt');
            return;
        }
        console.log(player === 1);
        if (player === 1) {
            gameState.player1Wins++;
        }
        else {
            gameState.player2Wins++;
        }
        if (gameState.player1Wins === 3 || gameState.player2Wins === 3) {
            io.emit('gameOver');
            gameState = getInitialGameState();
        }
        else {
            gameState.currentGame++;
            gameState.currentStageList = [...startingStageList];
            gameState.bannedStages = [];
            gameState.currentBanCount = 0;
            gameState.gamePhase = 'banning';
            gameState.currentBanningPlayer = player;
        }
        io.emit('gameState', gameState);
    });
    socket.on('skipBan', () => {
        gameState = Object.assign(Object.assign({}, gameState), { gamePhase: 'picking' });
        io.emit('gameState', gameState);
    });
    socket.on('returnToBan', () => {
        gameState = Object.assign(Object.assign({}, gameState), { gamePhase: 'banning' });
        io.emit('gameState', gameState);
    });
    socket.on('reset', () => {
        gameState = getInitialGameState();
        io.emit('resetState');
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
