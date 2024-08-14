const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*'
	}
});

const startingStageList = [
	{ id: 1, name: 'battlefield' },
	{ id: 2, name: 'final destination' },
	{ id: 3, name: 'smashville' },
	{ id: 4, name: 'town and city' },
	{ id: 5, name: "yoshi's story" },
	{ id: 6, name: 'pokemon stadium 2' },
	{ id: 7, name: 'kalos pokemon league' },
	{ id: 8, name: 'small battlefield' },
	{ id: 9, name: 'hollow bastion' }
];

let currentStageList = [...startingStageList];
let bannedStages = []; // To track which stages have been banned and by whom

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('A user connected:', socket.id);

	// Send the current stage list and banned stages to the client when they connect
	socket.emit('stageList', { stageList: currentStageList, bannedStages });

	socket.on('banStage', (data) => {
		const { stageId, player } = data;

		// Find and ban the stage
		const stageIndex = currentStageList.findIndex((stage) => stage.id === stageId);
		if (stageIndex !== -1) {
			const bannedStage = currentStageList.splice(stageIndex, 1)[0];
			bannedStages.push({ ...bannedStage, bannedBy: player });

			// Notify all clients about the updated stage list and banned stages
			io.emit('stageList', { stageList: currentStageList, bannedStages });
		}
	});

	socket.on('pickStage', (stageId) => {
		// Handle when a stage is picked (e.g., to finalize the selection)
		const pickedStage = currentStageList.find((stage) => stage.id === stageId);
		if (pickedStage) {
			console.log(`Stage picked: ${pickedStage.name}`);
			io.emit('stagePicked', pickedStage);

			// Reset the game state after picking a stage
			currentStageList = [...startingStageList];
			bannedStages = [];
		}
	});

	socket.on('reset', () => {
		console.log('Resetting stage list.');
		currentStageList = [...startingStageList];
		bannedStages = [];

		// Notify all clients that the stage list has been reset
		io.emit('stageList', { stageList: currentStageList, bannedStages });
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected:', socket.id);
		// No specific logic for disconnect in this simplified version
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
