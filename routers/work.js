const express = require('express');
const Db = require('../modules/db');
const fs = require('fs');

const router = express.Router();


router.get('/', (req, res) => {
    if (req.isLogin.status) {
        fs.readFile(__dirname + '/../not-public/work.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            return res.send(data);
        });
    } else {
        return res.send('You need to <a href="/">Login!</a>');
    }
});

router.post('/all', (req, res) => {
    if (req.isLogin.status) {
        res.json({
            arr: req.isLogin.user.todo,
            status: true,
            text: ''
        });

    } else {
        return res.json({status: false, text: 'You need to relogin!', arr: []});
    }
});

router.post('/add', (req, res) => {
    if (req.isLogin.status) {
        const todo = req.body.addText;
        const db = new Db('users');
        const user = req.isLogin.user;

        db.update(user, {todo: user.todo.concat(todo)})
            .then((result) => {
                return res.json({
                    status: 'ok',
                    text: result.todo[result.todo.length - 1],
                    all: result.todo
                });
            })
            .catch((err) => {
                console.log(err);
                return res.json({
                    status: 'bad',
                    text: 'server db error',
                    all: []
                });
            });


    } else {
        return res.json({status: 'bad', text: 'You need to relogin!', all: []});
    }
});

module.exports = router;