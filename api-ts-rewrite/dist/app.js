"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Mongo_1 = __importDefault(require("./Mongo"));
const auth_1 = __importDefault(require("./routes/auth"));
const api_1 = __importDefault(require("./routes/api"));
Mongo_1.default.getClient().connect();
// import { default as register } from "./src/controllers/auth/register.js";
// import { default as login } from "./src/controllers/auth/login.js";
// import { default as verify } from "./src/controllers/auth/verify.js";
// import { authApiLimiter } from "./src/utils/rateLimit.js";
// import { default as v1 } from "./src/controllers/v1/index.js";
// import authorize from "./src/middlewares/authorize.js";
const app = (0, express_1.default)();
// MIDDLEWARE
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/", auth_1.default);
app.use("/", api_1.default);
// RATE LIMITERS
// app.use("/auth", authApiLimiter);
// ROUTES
// app.use("/auth", register, login, verify);
// app.use("/api", authorize, v1);
// app.use(
//   "/auth/ping",
//   /* authorize, */ (req, res) => {
//     res
//       .status(200)
//       .json({ message: "Authorized", username: req.cookies.username });
//   }
// );
exports.default = app;
