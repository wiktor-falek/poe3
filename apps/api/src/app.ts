import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRouter from "./routes/api.js";
import authRouter from "./routes/auth.js";
import authorized from "./middlewares/authorized.js";
import morgan from "morgan";
const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(":method :url :status - :response-time ms"));

// public endpoints
app.use("/", authRouter);

// authorized endpoints
app.use("/", authorized, apiRouter);

export default app;
