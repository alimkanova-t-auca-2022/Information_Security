const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const chat = express();
const PORT = 3000;

chat.use(express.static(path.join(__dirname, 'public')));
chat.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = chat.listen(PORT, '0.0.0.0', ()=>{
 console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

const wss = new WebSocket.Server({server});
const users = new Set();
const messageHist = [];
const MAX_HISTORY= 100;

wss.on('connection', (ws) =>{
 ws.username = `User-${Math.random().toString(36).substr(2,8)}`;
 users.add(ws);

 ws.send(JSON.stringify({
   type:'system',
   content: `Your username: ${ws.username}`
}));
 if(messageHist.length >0){
    ws.send(JSON.stringify({
        type: 'history',
        data: messageHist.slice(-MAX_HISTORY)
}));
}
  broadcast({
    type: 'system',
    content: `${ws.username} joined the chat`
});
  ws.on('message', (message)=>{
    const messageObject = {
      type: 'message',
      user: ws.username,
      content: message.toString(),
      timestamp: new Date().toISOString()
};

    messageHist.push(messageObject);
    if(messageHist.length > MAX_HISTORY){
       messageHist.shift();
     }
   broadcast(messageObject);
});

  ws.on('close', ()=>{
   users.delete(ws);
   broadcast({
     type: 'system',
      content: `${ws.username} left the chat.`
});
});
});

function broadcast(message){
 users.forEach(user => {
   if (user.readyState == WebSocket.OPEN){
       user.send(JSON.stringify(message));
  }
 });
}
