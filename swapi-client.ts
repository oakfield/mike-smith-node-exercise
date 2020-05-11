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

export type PlanetApiResponse = {
    climate: string,
    created: string,
    diameter: string,
    edited: string,
    films: string[],
    gravity: string,
    name: string,
    orbital_period: string,
    population: string,
    residents: string[],
    rotation_period: string,
    surface_water: string,
    terrain: string
    url: string
}

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
    return fetch(url.toString(), { headers: { 'Accept': 'application/json '}})
        .then(result => result.json());
}