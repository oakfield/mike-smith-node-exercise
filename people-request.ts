import { Person } from './person-service';

export default interface PeopleRequest extends Express.Request {
    query: {
        sortBy: keyof Person;
    }
}