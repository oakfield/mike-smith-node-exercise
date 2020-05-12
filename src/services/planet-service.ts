import { Planet, PlanetApiResponse } from '../types';

import _ from 'lodash';
import { getPerson } from './person-service';
import { getPlanetPage } from '../clients/swapi-client';
import { unpage } from './service.util';

const MAX_PLANET_PAGE_NUMBER = 10;

export let getPlanets = async (): Promise<Planet[]> => {
    let requests = _.range(MAX_PLANET_PAGE_NUMBER)
        .map(getPlanetPage);

    let planetApiResponses = unpage(await Promise.all(requests));

    let planetPromises = planetApiResponses.map(async planetApiResponse => {
        let residents = await getResidents(planetApiResponse);

        return { ...planetApiResponse, residents } as Planet;
    });

    return Promise.all(planetPromises);
};

let getResidents = (planet: PlanetApiResponse) => Promise.all(planet.residents.map(getPerson));
