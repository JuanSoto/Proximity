import { Application } from "express";
import vehiclesRouter from "./api/vehicles/router";

export default function routes(app: Application): void {
  app.use("/api/vehicles", vehiclesRouter);
}
