import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressWinston from "express-winston";
import winston from "winston";

import { default as register } from "./src/controllers/auth/register.js";
import { default as login } from "./src/controllers/auth/login.js";
import { default as verify } from "./src/controllers/auth/verify.js";

import { authApiLimiter } from "./src/utils/rateLimit.js";
import { default as v1 } from "./src/controllers/v1/index.js";
import authorize from "./src/middlewares/authorize.js";

const app = express();

// MIDDLEWARE
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

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    level: "info",
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

// RATE LIMITERS
app.use("/auth", authApiLimiter);

// ROUTES
app.use("/auth", register, login, verify);
app.use("/api", authorize, v1);

app.use("/auth/ping", authorize, (req, res) => {
  res.status(200).json({ message: "Authorized", username: req.cookies.username });
})

export default app;