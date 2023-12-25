import express from 'express'
import http from 'node:http'
import dotenv from 'dotenv'

import { server as WebSocketServer } from 'websocket'
import cors from 'cors'
import { userRouter } from './routes/auth';
import { connectDB } from './config/db';

dotenv.config();

const app = express(); 

app.use(cors());
app.use(express.json());

app.use('/auth', userRouter);

const server = http.createServer(app)

server.listen(3000, async () => {
    await connectDB();
    console.log("Server listening on port 3000");
})

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
})

const originIsAllowed = (origin: string) => {
    return true;
}

wsServer.on('request', (request) => {
    if(!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    // const connection = request.accept('echo-protocol', request.origin);
    const connection = request.accept();
    console.log((new Date()) + ' Connection accepted!');
})

