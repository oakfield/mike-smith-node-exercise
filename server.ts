import express = require('express');

const app: express.Application = express();

app.get('/people', (req, res) => {
    res.send('people');
});

app.get('/planets', (req, res) => {
    res.send('planets');
});

app.listen(3000, () => {
    console.log('Listening on port 3000.')
});