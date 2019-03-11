const express = require('express');
const Db = require('../modules/db');
const newToken = require('../modules/token-generator');

const router = express.Router();

router.post('/', (req, res) => {
    const { login, pass } = req.body;
    const db = new Db('users');
    db.find({ login })
        .then((result) => {
            if (result === null) {
                return res.json({status: 'user-not-found'});
            };
            if (result.pass !== pass) {
                return res.json({status: 'wrong-password'});
            };
            
            const user = { ...result };
            const nowTime = new Date().getTime();

            if ((nowTime - user.tokenTime) >= 300000) {
                const tokenObj = newToken();
                db.update(user, tokenObj)
                    .then((result) => {
                        res.cookie('token', result.token, {httpOnly: true});
                        return res.json({status: 'logged-in'});
                    })
                    .catch((err) => {
                        console.log('error in update db', err);
                    });
            } else {
                res.cookie('token', user.token, {httpOnly: true});
                return res.json({status: 'logged-in'});
            }
        })
        .catch((err) => {
            console.log('error: ', err);
        })
});

module.exports = router;