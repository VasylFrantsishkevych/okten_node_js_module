const express = require('express');
const {engine} = require('express-handlebars');
const path = require("path");
const {use} = require("express/lib/router");

const users = [
    // {firstName: 'Tolik', lastName: 'Petrocian', email: 'asad@sd.com', password: '58155', age: 20, city: 'Lviv'},
    // {firstName: 'Vova', lastName: 'Kaban', email: 'xawe@sd.com', password: 'as4545', age: 41, city: 'Kyiv'},
    // {firstName: 'Olia', lastName: 'Ivanycian', email: 'waxa@sd.com', password: 'as5484', age: 25, city: 'Ternopil'},
    // {firstName: 'Tamara', lastName: 'Kolobok', email: 'dasa@sd.com', password: 'as5552', age: 19, city: 'Stryi'}
]
let error = '';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/login', (req, res) => {
    res.render('login');
});

// - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект на сторінку цього

app.get('/sign', (req, res) => {
    res.render('sign');
});

app.post('/sing', (req, res) => {
    const {body} = req;
    const user = users.find(user => user.email === body.email && user.password === body.password);
    if (!user) {
        error = 'Email or password not exist'
        res.redirect('error')
    }
    res.redirect(`/users/${user.id}`)
})

// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city

app.get('/users', (req, res) => {
    const {query} = req;
    if (Object.keys(query).length){
        let userArr = [...users];
        if (query.city) {
            userArr = userArr.filter(user => user.city.toLowerCase() === query.city.toLowerCase());
        }
        if (query.age) {
            userArr = userArr.filter(user => user.age === query.age);
        }
        res.render('users', {users: userArr});
        return;
    }
    res.render('users', {users});
})

// 3. /user/:id сторінка з інфою про одного юзера

app.get('/users/:id', (req, res) => {
    const {id} = req.params
    const user = users[id - 1]
    res.render('user', {user})
})

app.post('/login', (req, res) => {
    const {body} = req;
    const user = users.some(user => user.email === body.email)
    if (user) {
        error = 'Email is used!!';
        res.redirect('error')
    } else {
        users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
        res.redirect('/users');
    }
});

app.get('/error', (req, res) => {
    res.render('error', {error})
});
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

app.use((req, res) => {
    res.render('notFound')
})


app.listen(5200, () => {
    console.log('Server has started 5200');
})