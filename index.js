const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const port = 3000;

//сделать мидделверу для проверки залогировал чел или не, и записывать в переменную req.isLoggined

const db = [
    {
        login: 'admin',
        pass: '1234',
        id: '00001',
        token: '',
        sessionTime: 0
    },
    {
        login: 'lol',
        pass: 'lolka',
        id: '99999',
        token: '',
        sessionTime: 0
    }
];

function isUserInDb(userData) {
    for (let i = 0; i < db.length; i++) {
        if (db[i].login === userData.login && db[i].pass === userData.pass) {
            const someToken = uuid.v4();
            db[i].token = someToken;
            db[i].sessionTime = new Date().getTime();
            return someToken;
        }
    }
    return false;
}

function tokenSearch(token) {
    for (let i = 0; i < db.length; i++) {
        if (db[i].token === token) {
            return true;
        }
    }
    return false;
}

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());

app.post('/login', (req, res) => {
    const data = req.body;

    const token = isUserInDb(data);
    if (token) {
        res.send(token);
    } else {
        res.send('bad');
    }
    
});

app.get('/work', (req, res) => {
    if (tokenSearch(req.query.session)) {
        fs.readFile('./not-public/work.html', 'utf-8', (err, data) => {
            if (err) {
                res.send('error read file');
                console.log(err);
                return;
            } 
    
            res.send(data);
        });
    } else {
        res.status(404).send('not found');
    }
});

app.listen(port, () => {
    console.log(`App on port ${port}...`);
});