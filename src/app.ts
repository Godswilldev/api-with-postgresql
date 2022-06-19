import express, { Application, Request, Response } from "express";

export const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));
