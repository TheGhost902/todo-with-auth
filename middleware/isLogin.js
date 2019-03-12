const Db = require('../modules/db');

function isLogin() {
    return (req, res, next) => {
        if (req.cookies.token) {
            console.log(req.cookies);
            const token = req.cookies.token;
            const db = new Db('users');
            const nowTime = new Date().getTime();

            db.find({token})
                .then((user) => {
                    if (!user) {
                        req.isLogin = {
                            status: false,
                            text: 'no-token-in-db',
                            user: {}
                        };
                        return next();
                    }

                    if ((nowTime - user.tokenTime) < 300000) {
                        req.isLogin = {
                            status: true,
                            text: 'all-is-good',
                            user
                        };
                        return next();
                    } else {
                        req.isLogin = {
                            status: false,
                            text: 'bad-token-time',
                            user: {}
                        };
                        return next();
                    }
                })
                .catch((err) => {
                    console.log('error in find in middelware: ',err );
                });
        } else {
            req.isLogin = {
                status: false,
                text: 'no-token-in-cookies',
                user: {}
            };
            return next();
        }
    }
}

module.exports = isLogin;