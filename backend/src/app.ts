import 'reflect-metadata';
import express from 'express';
import { engine } from 'express-handlebars';
import { createConnection } from 'typeorm';
import path from 'path';
import http from 'http';
import SocketIO from 'socket.io';
// import { cronRun } from './cron';

import { apiRouter } from './router';
import { config } from './config/config';
import { socketController } from './controller';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
    console.log(socket.handshake.query.userId);

    socket.on('message:create', (data: any) => {
        socketController.messageCreate(io, socket, data);
    });

    socket.on('join_room', (data: any) => {
        socketController.joinRoom(io, socket, data);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(apiRouter);

const { PORT } = config;

server.listen(PORT, async () => {
    console.log(`Server has started on port: ${PORT}`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connection');
            // await cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
