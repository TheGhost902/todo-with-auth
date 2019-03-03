const uuid = require('uuid');

function newToken() {
    const token = uuid.v4()
        .split('')
        .filter((item) => {
            if (item === '-') return false;
            return true;
        })
        .join('');
    return {
        token,
        tokenTime: new Date().getTime()
    };
}

module.exports = newToken;