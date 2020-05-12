import { Person, PersonApiResponse } from '../types';
import { getPeoplePage, getPerson as getPersonApiResponse } from '../clients/swapi-client';

import _ from 'lodash';
import { unpage } from './service.util';

const MAX_PEOPLE_PAGE_NUMBER = 10;

export let getPerson = async (personUrl: string): Promise<Person> => {
    return getPersonApiResponse(personUrl)
        .then(personApiResponse => toPerson(personApiResponse));
}

export let getPeople = async (personProperty: keyof Person): Promise<Person[]> => {
    let requests = _.range(1, MAX_PEOPLE_PAGE_NUMBER)
        .map(getPeoplePage);
    let personApiResponsePages = await Promise.all(requests);
    let people = unpage(personApiResponsePages)
        .map(toPerson);

    return _.sortBy(people, personProperty);
};

let toPerson = (personApiResponse: PersonApiResponse): Person => ({
    ...personApiResponse,
    height: Number.parseInt(personApiResponse.height, 10),
    mass: Number.parseInt(personApiResponse.mass, 10)
});
