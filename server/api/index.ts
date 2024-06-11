import { expressLoader } from '../src/loaders/express';
import { client } from '../src/loaders/mongodb';

async function server() {
    const express = expressLoader();
    
    return express;
}

server().then((server) => {
    process.on('SIGINT', () => {
        server.close(() => {
            client.close();
            console.log("closed mongodb");
        });
    });
});