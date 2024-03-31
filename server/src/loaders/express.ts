import express, { Express } from 'express';
import cors from 'cors';

import routes from '../api/index'

export default (app: Express) => {
    app.use(cors());
    app.use(express.json());
    app.use('/api', routes);
}