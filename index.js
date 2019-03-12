const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const isLogin = require('./middleware/isLogin');

const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const workRouter = require('./routers/work');

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(express.json());
app.use(isLogin());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/work', workRouter);

// app.get('/work', (req, res) => {
//     if (req.isLogin.status) {
//         res.send('You in /work');
//     } else {
//         res.send('You need to <a href="/">Login!</a>');
//         console.log(req.isLogin.text);
//     }
// });

app.use((req, res) => {
    res.status(404).send('404 file or page not found');
});

app.listen(port, () => {
    console.log(`App on port ${port}...`);
});