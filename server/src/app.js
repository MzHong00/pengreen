import express from 'express';
import config from './config/index.js'

import loaders from './loaders/index.js';

async function startServer() {
    const app = express();

    await loaders({ expressApp: app })

    app.listen(config.port, () => {
        console.log(`http://localhost:${config.port}`);
    });
}

startServer();