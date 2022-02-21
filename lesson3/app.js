const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');

const apiRouter = require('./routers/api.router')

const app = express();

//читає файли джейсон
app.use(express.json());
//зчитує дані url
app.use(express.urlencoded({extended: true}));
//вказуємо папку на темплейти
app.use(express.static(path.join(__dirname, 'statics')));

//вказуємо який двигун будемо використовувати
app.set('view engine', '.hbs');
//налаштування щоб спрацьовували файли з розширенням .hbs
app.engine('.hbs', engine({defaultLayout: false}));
//вказуємо де зберігаться файли з розширенням .hbs
app.set('views', path.join(__dirname, 'statics'));

app.use(apiRouter);

app.listen(5500, () => {
    console.log('Server works');
});