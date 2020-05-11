import { PersonApiResponse, getPeoplePage, getPerson as getPersonApiResponse } from './swapi-client';

import _ from 'lodash';

export type Person = {
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: string[],
    species: [],
    vehicles: string[],
    starships: string[],
    created: string,
    edited: string,
    url: string
}

const MAX_PEOPLE_PAGE_NUMBER = 8;

export let getPerson = async (personUrl: string): Promise<Person> => {
    return getPersonApiResponse(personUrl)
        .then(personApiResponse => toPerson(personApiResponse));
}

export let getPeople = async (personProperty: keyof Person): Promise<Person[]> => {
    let requests = _.range(MAX_PEOPLE_PAGE_NUMBER)
        .map(getPeoplePage);

    let personApiResponsePages = await Promise.all(requests);

    return _(personApiResponsePages)
        .flatMap(page => page.results)
        .compact()
        .map(toPerson)
        .sortBy(personProperty)
        .value();
};

let toPerson = (personApiResponse: PersonApiResponse): Person => ({
    ...personApiResponse,
    height: Number.parseInt(personApiResponse.height, 10),
    mass: Number.parseInt(personApiResponse.mass, 10)
});
