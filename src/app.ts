import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import path from 'path';
import { engine } from 'express-handlebars';

import { apiRouter } from './router';
import { config } from './config/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(apiRouter);

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server has started on port: ${PORT}`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connection');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
