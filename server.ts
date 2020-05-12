import api from './src/api';
import express from 'express';

let app: express.Application = express();

app.use('/', api);

app.listen(3000, () => {
    console.log('Listening on port 3000.')
});