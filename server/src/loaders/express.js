import express from 'express';
import cors from 'cors';

import routes from '../api/index.js'

export default ({ app }) => {
    app.use(cors());
    app.use(express.json());
    app.use('/api', routes);
}