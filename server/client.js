const WebSocket = require('ws');

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:8080');

// Event listener for connection open
ws.on('open', () => {
    console.log('Connected to the WebSocket server.');

    // Send a message to the server
    ws.send('Hello, Server!');
});

// Event listener for receiving messages from the server
ws.on('message', (data) => {
    console.log(`Received message from server: ${data}`);
});

// Event listener for errors
ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});

// Event listener for connection close
ws.on('close', () => {
    console.log('Connection to server closed.');
});
