import { Page, PlanetApiResponse, getPlanetPage } from './swapi-client';
import { Person, getPerson } from './person-service';

import _ from 'lodash';

export type Planet = {
    climate: string,
    created: string,
    diameter: string,
    edited: string,
    films: string[],
    gravity: string,
    name: string,
    orbital_period: string,
    population: string,
    residents: Person[],
    rotation_period: string,
    surface_water: string,
    terrain: string
    url: string
}

const MAX_PLANET_PAGE_NUMBER = 10;

export let getPlanets = async (): Promise<Planet[]> => {
    let requests = _.range(MAX_PLANET_PAGE_NUMBER)
        .map(getPlanetPage);

    let planetApiResponsePages = await Promise.all(requests);

    let planetApiResponses = _(planetApiResponsePages)
        .flatMap(page => page.results)
        .compact()
        .value();

    let planetPromises = planetApiResponses.map(async planetApiResponse => {
        let residents = await getResidents(planetApiResponse);

        return { ...planetApiResponse, residents } as Planet;
    });

    return Promise.all(planetPromises);
};

function getResidents(planet: PlanetApiResponse) {
    return Promise.all(planet.residents.map(getPerson));
}
