import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Mongo from "./Mongo";
import apiRouter from "./routes/api";
import authRouter from "./routes/auth";
import authorized from "./middlewares/authorized";

Mongo.getClient().connect();

// import { default as register } from "./src/controllers/auth/register.js";
// import { default as login } from "./src/controllers/auth/login.js";
// import { default as verify } from "./src/controllers/auth/verify.js";

// import { authApiLimiter } from "./src/utils/rateLimit.js";
// import { default as v1 } from "./src/controllers/v1/index.js";
// import authorize from "./src/middlewares/authorize.js";

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
