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
        origin: 'http://localhost:5173', // Update this to match your Svelte app's URL
        methods: ['GET', 'POST']
    }
});
// Initial stage list
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
// Initial game state
const getInitialGameState = () => ({
    currentStageList: [...startingStageList],
    bannedStages: [],
    currentBanningPlayer: null,
    currentGame: 1,
    currentBanCount: 0,
    gamePhase: 'banning',
    player1Wins: 0,
    player2Wins: 0
});
let gameState = getInitialGameState();
const calculateBanningPlayer = () => {
    if (gameState.currentGame === 1) {
        return gameState.currentBanCount < 3 ? gameState.currentBanningPlayer : gameState.currentBanningPlayer === 1 ? 2 : 1;
    }
    return gameState.currentBanningPlayer;
};
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    // Send initial game state to newly connected client
    socket.emit('gameState', gameState);
    socket.on('requestState', () => {
        socket.emit('gameState', gameState);
    });
    socket.on('rockPaperScissors', (winner) => {
        gameState.currentBanningPlayer = winner;
        io.emit('gameState', gameState);
    });
    socket.on('banStage', ({ stageId, player }) => {
        if (gameState.gamePhase !== 'banning' || player !== calculateBanningPlayer()) {
            socket.emit('error', 'Invalid ban attempt');
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
        }
        else {
            gameState.player2Wins++;
        }
        if (gameState.player1Wins === 3 || gameState.player2Wins === 3) {
            gameState.gamePhase = 'set-end';
        }
        else {
            gameState.currentGame++;
            gameState.currentStageList = [...startingStageList];
            gameState.bannedStages = [];
            gameState.currentBanCount = 0;
            gameState.gamePhase = 'banning';
        }
        gameState.currentBanningPlayer = player;
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
