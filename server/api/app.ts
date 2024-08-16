import express from "express";

import loader from "../src/loaders";
import config from "../src/config";

async function server() {
  const app = express();

  await loader({ expressApp: app });

  const server = app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
  });

  return server;
}

server();