import cors from "cors";
import { AppError } from "./utils/appError";
import weaponsRouter from "./routes/weapon.route";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./controllers/error.controller";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/weapon", weaponsRouter);

app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));

app.all("*", (req, _res, next) => next(new AppError("Invalid path", 404)));

app.use(globalErrorHandler);

export default app;
