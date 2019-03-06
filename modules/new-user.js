const newToken = require('./token-generator');

function newUser(obj) {
    const { login, pass } = obj;
    const { token, tokenTime } = newToken();

    return {
        login,
        pass,
        token,
        tokenTime,
        todo: []
    };
}

module.exports = newUser;