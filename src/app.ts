import express, { Application, Request, Response } from "express";
import weaponsRouter from "./routes/weapon.route";
import cors from "cors";

export const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/weapon", weaponsRouter);
app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));
