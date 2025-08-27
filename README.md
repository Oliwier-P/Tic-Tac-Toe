# Real-Time Tic-Tac-Toe Game 

A real-time multiplayer Tic-Tac-Toe with 2 game modes AI & onilne, AI mode has 3 levels of difficulty Easy, Medium , Hard (Impossible)

## Project Structure
```
├── client/                  # Frontend code (React)  
│   ├── src/                 # Source files
│   │   ├── assets/          # Assets (svg, etc)
│   │   ├── components/      # React components  
│   │   ├── pages/           # Page components  
│   │   ├── types/           # Main App component
│   │   └── socket.ts        # Client socket
│   └── package.json         # Frontend dependencies  
│  
├── server/                  # Backend code (Node.js + Express)  
│   ├── test/                # Server tests
│   ├── server.js            # Socket.IO logic
│   ├── socketsHandlers.js   # Socket.IO events  
│   └── package.json         # Backend dependencies  
│  
├── .gitignore.md            # Git ignore rules for the whole project
├── package.json             # Dependencies and scripts for easier install and start
└── README.md                # Project documentation  

```

## Getting Started 

Quick installation guide:

```bash
git clone https://github.com/Oliwier-P/Tic-Tac-Toe

npm run install-all
```

Install client or server dependencies 
```bash
npm run install:client

npm run install:server
```

Run the development servers:
```bash
npm run dev  
```

## Environment Variables
Create ```.env``` file in ```server/```

```bash
PORT=3000
CLIENT_ORIGIN=http://localhost:5173
```

## Running Tests

Tests for server side:

```bash
npm run test
```

## Features
- Styled box in top left corner is home button
- If a player wins or ends in a draw, a new game will start in 2-3 seconds
- Game is endless until the player decides to leave

## Screenshots

### Homepage

![image](https://github.com/user-attachments/assets/fbe3a881-17c9-4be2-85a2-4f1840737549)

### Difficulty

![image](https://github.com/user-attachments/assets/83434e84-b764-4d98-8dac-8e7b37fca54d)

### Create or Join a Room

![image](https://github.com/user-attachments/assets/2697562b-e98d-4193-beee-f7ea8648b4bb)

### Game Room

![image](https://github.com/user-attachments/assets/1a34be6e-fac9-4f15-88e2-ce730080450d)


### Tech Stack
- Node.js
- Express
- Socket.IO
- React
- Javascript / Typescript
