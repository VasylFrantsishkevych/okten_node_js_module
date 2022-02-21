let users = require('../db/users');

module.exports = {
    getAllUsers: (req, res) => {
        const {city, age} = req.query;
        if (Object.keys(req.query).length){
            let userArr = [...users];
            if (city) {
                userArr = userArr.filter(user => user.city.toLowerCase() === city.toLowerCase());
            }
            if (age) {
                userArr = userArr.filter(user => user.age === age);
            }
            res.render('users', {users: userArr});
            return;
        }
        res.render('users', {users});
    },
    getUserById: ({user}, res) => {
        // const {params} = req;
        // const user = users.find(user => user.id === +params.id );
        // try {
        //     if (!user) {
        //         throw new Error(`User with ID: ${params.id} exist!`);
        //     }
        // }catch ({message}) {
        //     res.redirect(`/error?error=${message}`);
        // }
        res.render('userInfo', {user});
    },
    deleteUserById: (req, res) => {
        const {params} = req;
        users = users.filter(user => user.id !== +params.id);
        res.redirect('/users');
    }
};