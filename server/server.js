const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log('WebSocket server started on ws://localhost:8080');
});

// Handle connection events
wss.on('connection', (ws) => {
    console.log('A new client connected.');

    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

    // Listen for messages from the client
    ws.on('message', (data) => {
        console.log(`Received message from client: ${data}`);

        // Echo the message back to the client
        ws.send(JSON.stringify({ message: `Server received: ${data}` }));
    });

    // Handle the client disconnecting
    ws.on('close', () => {
        console.log('Client disconnected.');
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
