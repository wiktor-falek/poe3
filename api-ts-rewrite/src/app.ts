import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Mongo from "./Mongo";
import apiRouter from "./routes/api";
import authRouter from "./routes/auth";
import authorized from "./middlewares/authorized";

Mongo.getClient().connect();

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

// public endpoints
app.use("/", authRouter);

// authorized endpoints
app.use("/", authorized, apiRouter);

export default app;
