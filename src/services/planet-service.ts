import { Planet, PlanetApiResponse } from '../types';

import _ from 'lodash';
import { getPerson } from './person-service';
import { getPlanetPage } from '../clients/swapi-client';
import { unpage } from './service.util';

const MAX_PLANET_PAGE_NUMBER = 7;

export let getPlanets = async (): Promise<Planet[]> => {
    let requests = _.range(1, MAX_PLANET_PAGE_NUMBER)
        .map(getPlanetPage);

    let planetPromises = unpage(await Promise.all(requests))
        .map(async planetApiResponse => {
            let residents = await getResidents(planetApiResponse);

            return { ...planetApiResponse, residents } as Planet;
        });

    return Promise.all(planetPromises);
};

let getResidents = (planet: PlanetApiResponse) => Promise.all(planet.residents.map(getPerson));
