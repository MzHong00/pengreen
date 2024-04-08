import express from 'express';
import config from '../src/config/index'

import loaders from '../src/loaders/index';
import { client } from '../src/data-access/mongodb/index';

async function startServer() {
    const app = express();

    const server = app.listen(config.port, () => {
        console.log(`http://localhost:${config.port}`);
        
    });
    
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