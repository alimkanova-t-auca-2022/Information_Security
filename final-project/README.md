# Real-Time Chat Application

A simple instant messaging chat application running over WebSocket. Supports multiple users, message history and automatic logon/logoff notifications.

##  Requirements
- Node.js
- NPM (usually comes with Node.js)
- Browser (Chrome, Firefox, Edge)
- Postman for testing

## Installation
1. Download the project
```bash 
git clone https://github.com/ваш-репозиторий.git
cd websocket-chat```

Install dependencies:
```bash
npm install```

##Start the server:
```node server.js```
Open in a browser:
```http://localhost:3000```
##Features
- Sending messages in real time
- Automatic usernames (e.g. "User-abc123")
- History of last 100 messages
- New member notifications

##Testing
In a browser:
Open http://localhost:3000 in two different windows.

Start correspondence - messages will appear instantly

##In Postman:
Create a new WebSocket request

Enter the address: ws://localhost:3000

Click "Connect" and send messages

##Project Presentation
```https://drive.google.com/file/d/1ldMDS-Hs-t_UnollWwJR56eZrNhpJJIL/view?usp=sharing```

##Project structure
websocket-chat/
├─── server.js # Main server
├─── public/
│ └── index.html # Chat interface
└── package.json # Dependencies
