import * as peopleService from '../services/person-service';
import * as planetService from '../services/planet-service';

import { PeopleRequest } from '../types';
import express from 'express';

let api = express.Router();

api.get('/people', async (req: PeopleRequest, res) => {
    res.send(await peopleService.getPeople(req.query.sortBy));
});

api.get('/planets', async (req, res) => {
    res.send(await planetService.getPlanets());
});

export default api;