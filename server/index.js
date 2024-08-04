const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'localhost:5173' }));

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*'
	}
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('message', (data) => {
		console.log('Received message:', data);
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
