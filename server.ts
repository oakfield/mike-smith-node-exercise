import express = require('express');
import peopleService = require('./person-service');
import planetService = require('./planet-service');

import PeopleRequest from './people-request';

const app: express.Application = express();

app.get('/people', async (req: PeopleRequest, res) => {
    res.send(await peopleService.getPeople(req.query.sortBy));
});

app.get('/planets', async (req, res) => {
    res.send(await planetService.getPlanets());
});

app.listen(3000, () => {
    console.log('Listening on port 3000.')
});