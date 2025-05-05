const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

const wss = new WebSocket.Server({ server });
const clients = new Set();
const messageHistory = [];
const MAX_HISTORY = 100;

wss.on('connection', (ws) => {
    ws.username = `User-${Math.random().toString(36).substr(2, 8)}`;
    clients.add(ws);

    ws.send(JSON.stringify({
        type: 'system',
        content: `Your username: ${ws.username}`
    }));

    if (messageHistory.length > 0) {
        ws.send(JSON.stringify({
            type: 'history',
            data: messageHistory.slice(-MAX_HISTORY)
        }));
    }

    broadcast({
        type: 'system',
        content: `${ws.username} joined the chat`
    });

    ws.on('message', (message) => {
        const msgObj = {
            type: 'message',
            user: ws.username,
            content: message.toString(),
            timestamp: new Date().toISOString()
        };

        messageHistory.push(msgObj);
        if (messageHistory.length > MAX_HISTORY) {
            messageHistory.shift();
        }
        broadcast(msgObj);
    });

    ws.on('close', () => {
        clients.delete(ws);
        broadcast({
            type: 'system',
            content: `${ws.username} left the chat`
        });
    });
});

function broadcast(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
