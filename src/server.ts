import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
dotenv.config();

const app: Application = express();
const PORT: string = process.env.LOCAL_HOST_PORT || "8900";
const HOST: string = process.env.LOCAL_HOST || "localhost";

app.use(express.json());

app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`starting app on: ${HOST}:${PORT}`));
