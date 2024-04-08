import express from 'express';
import config from './config/index'

import loaders from './loaders/index';
import { client } from './data-access/mongodb/index';

async function startServer() {
    const app = express();

    const server = app.listen(config.port, () => {
        console.log(`http://localhost:${config.port}`);
    });
    console.log(app);
    
    app.get('/', (req, res) => {
        res.send("hello");
    })

    await loaders({
        expressApp: app
    })
    
    return server;
}

startServer().then((server) => {
    process.on('SIGINT', () => {
        server.close(() => {
            client.close();
            console.log("closed mongodb");
        });
    });
});