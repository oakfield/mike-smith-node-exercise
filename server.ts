import express = require('express');
import peopleService = require('./people-service');

import PeopleRequest from './people-request';

const app: express.Application = express();

app.get('/people', async (req: PeopleRequest, res) => {
    res.send(await peopleService.getPeople(req.query.sortBy));
});

app.get('/planets', (req, res) => {
    res.send('planets');
});

app.listen(3000, () => {
    console.log('Listening on port 3000.')
});