import express from 'express'
import http from 'node:http'
import dotenv from 'dotenv'

import { server as WebSocketServer } from 'websocket'
import cors from 'cors'
import { userRouter } from './routes/auth.routes';
import { connectDB } from './config/db';
import { roomRouter } from './routes/room.routes'
import { validateWSRequest } from './middleware/authMiddleware'

dotenv.config();

const app = express(); 

app.use(cors());
app.use(express.json());

app.use('/auth', userRouter);
app.use('/room', roomRouter)


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

wsServer.on('request', async (request) => {
    if(!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    try {
        const token = request.httpRequest.headers.authorization;
        if(!token) {
            request.reject(401, "Unauthorized User!");
            return;
        }

        const data = await validateWSRequest(token);
        if(!data.status){
            request.reject(401, data.message);
            return;
        }
        
        // const connection = request.accept('echo-protocol', request.origin);
        const connection = request.accept();
        console.log((new Date()) + ' Connection accepted!');
    } catch (error: any) {
        console.log((error as Error).message);
        request.reject(401, (error as Error).message);
    }
})

