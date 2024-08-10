import express from "express";

import loader from "../src/loaders";
import config from "../src/config";
import mongoClient from "../src/loaders/mongodb";

async function server() {
  const app = express();

  await loader({ expressApp: app });

  const server = app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
  });

  return server;
}

server().then((server) => {
  process.on("SIGINT", () => {
    server.close(() => {
      mongoClient.close();
      console.log("closed mongodb");
    });
  });
});
