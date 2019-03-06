const express = require('express');
const morgan = require('morgan');
const loginRouter = require('./routers/login');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/login', loginRouter);

// //тест!
// app.use((req, res) => {
//     console.log(req.cookies);
//     res.send('ok');
// });

app.listen(port, () => {
    console.log(`App on port ${port}...`);
});