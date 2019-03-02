const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());




app.listen(port, () => {
    console.log(`App on port ${port}...`);
});