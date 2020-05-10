import { Person } from './people-service';

export default interface PeopleRequest extends Express.Request {
    query: {
        sortBy: keyof Person;
    }
}