import fetch from 'node-fetch';

const SWAPI_HOST = 'https://swapi.dev/';

export type Page<Data> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Data[];
}

export type PersonApiResponse = {
    name: string,
    height: string,
    mass: string,
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

export const getPeoplePage = (pageNumber: number): Promise<Page<PersonApiResponse>> => {
    return get<Page<PersonApiResponse>>(`/api/people/?page=${pageNumber}`);
};

const get = <T>(path: string): Promise<T> => {
    let url = new URL(path, SWAPI_HOST);
    return fetch(url.toString(), { headers: { 'Accept': 'application/json '}})
        .then(result => result.json());
}