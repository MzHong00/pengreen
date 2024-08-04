import express, { Application } from "express";
import cors from "cors";

import routes from "../api";

export default ({ app }: { app: Application }) => {
  const corsOptions = {
    origin: "http://wslib.vercel.app",
    credentials: true,
  };

  app.use(cors());
  app.use(express.json());
  app.use("/api", routes());
};
