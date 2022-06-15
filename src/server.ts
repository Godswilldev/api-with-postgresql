import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT || "8900";
const HOST: string = process.env.HOST || "localhost";

app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`starting app on: ${HOST}:${PORT}`));
