const express = require('express');
const morgan = require('morgan');
const loginRouter = require('./routers/login');

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use('/login', loginRouter);

app.listen(port, () => {
    console.log(`App on port ${port}...`);
});