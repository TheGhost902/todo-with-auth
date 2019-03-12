const express = require('express');
const Db = require('../modules/db');
const newUser = require('../modules/new-user');

const router = express.Router();

router.post('/', (req, res) => {
    const { login, pass } = req.body;
    const db = new Db('users');

    db.find({ login })
        .then((result) => {
            if (result === null) {
                db.add(newUser({ login, pass }))
                    .then((addedUser) => {
                        return res.json({status: 'registered'});
                    })
                    .catch((err) => {
                        res.sendStatus(500);
                        return console.log(err);
                    });
            } else {
                return res.json({status: 'user-already-registered'});
            }
        })
        .catch((err) => {
            res.sendStatus(500);
            return console.log(err);
        });
});

module.exports = router;