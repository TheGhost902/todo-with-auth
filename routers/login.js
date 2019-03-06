const express = require('express');
const Db = require('../modules/db');
const newToken = require('../modules/token-generator');

const router = express.Router();

router.post('/', (req, res) => {
    const { login, pass } = req.body;
    const db = new Db('users');
    db.find({ login })
        .then((result) => {
            if (result === null) return res.send({status: 'user-not-found'});
            if (result.pass !== pass) return res.send({status: 'wrong-password'});

            const user = { ...result };
            const tokenObj = newToken();
            db.update(user, tokenObj)
                .then((result) => {
                    res.cookie('Token', result.token, {httpOnly: true});
                    res.send({status: 'logged-in', token: result.token});
                })

        });
});

module.exports = router;