import { connectDB } from './config/db';
import http from 'http'
import { server as WebSocketServer } from 'websocket'
import dotenv from 'dotenv'

dotenv.config();

const server = http.createServer((req, res) => {
    console.log("Request Recieved!");
    res.end("Welcome to Whats app Server!");
})

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

    const connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted!');
})