import express from 'express'
import http from 'node:http'
import dotenv from 'dotenv'

import { server as WebSocketServer, Message, request, connection } from 'websocket'
import cors from 'cors'

import { connectDB } from './config/db';
import { roomRouter } from './routes/room.routes'
import { validateWSRequest } from './middleware/authMiddleware'
import { authRouter } from './routes/auth.routes'
import { handleRequest } from './ws'
import { addConnection, removeConnection } from './controllers/poolController'
import { authMiddleware } from './middleware/authMiddleware'

dotenv.config();

const app = express(); 

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/room', authMiddleware, roomRouter)


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

wsServer.on('request', async (request: request) => {
    if(!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    
    try {
        // const token = request.httpRequest.headers.authorization;
        const token = request.httpRequest.url?.slice(1);
        if(!token) {
            request.reject(401, "Unauthorized User!");
            return;
        }

        const data = await validateWSRequest(token);
        if(!data.status){
            request.reject(401, data.message);
            return;
        }
        
        const connection = request.accept('echo-protocol', request.origin);
        // const connection: connection = request.accept();
        console.log((new Date()) + ' Connection accepted!');

        addConnection({ userId: data.id, connection})

        connection.on('message', (message: Message) => {
            // console.log(message);
            if(message.type === 'utf8') {
                handleRequest(JSON.parse(message.utf8Data), data.id);
            }
        })

        connection.on('close', function(reasonCode, description) {
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            removeConnection(data.id);
        });

    } catch (error: any) {
        console.log((error as Error).message);
        request.reject(401, (error as Error).message);
    }
})

