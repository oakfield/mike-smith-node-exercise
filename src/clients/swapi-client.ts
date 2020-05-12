import { Page, PersonApiResponse, PlanetApiResponse } from '../types';

import fetch from 'node-fetch';

const SWAPI_HOST = 'https://swapi.dev/';

export const getPerson = (personUrl: string): Promise<PersonApiResponse> => {
    return get<PersonApiResponse>(personUrl);
};

export const getPeoplePage = (pageNumber: number): Promise<Page<PersonApiResponse>> => {
    return get<Page<PersonApiResponse>>(`/api/people/?page=${pageNumber}`);
};

export const getPlanetPage = (pageNumber: number): Promise<Page<PlanetApiResponse>> => {
    return get<Page<PlanetApiResponse>>(`/api/planets/?page=${pageNumber}`);
};

const get = <T>(path: string): Promise<T> => {
    let url = new URL(path, SWAPI_HOST);
    return fetch(url.toString(), { headers: { 'Accept': 'application/json ' } })
        .then(result => result.json());
}