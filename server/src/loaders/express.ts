import express from "express";
import cors from "cors";
import { config } from "../config/config";

import routes from "../api/routes/index";

export const expressLoader = () => {
  const app = express();

  const corsOptions = {
    origin: "http://wslib.vercel.app",
    credentials: true,
  };

  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  const server = app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
  });
  
  return server;
};
