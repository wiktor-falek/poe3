"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
/**
 * Queries db for an user with username and sessionId from cookie.
 * If unsuccessfull returns status 401 message breaking the middleware chain.
 * If successfull passes { username, sessionId, userId,  } to succeeding middlewares.
 *
 * EXAMPLE AUTHORIZED ROUTE
 *   import authorize from "./middlewares/authorize.ts"
 *   import apiRouter from "./routes/api"
 *   app.use("/api", authorize, apiRouter);
 *
 * ACCESSING PASSED DATA IN SUCCEEDING MIDDLEWARE
 *   function someController() {
 *     const { username, sessionId, userId, user } = res.locals;
 *   }
 */
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, sessionId } = req.cookies;
    if (!username || !sessionId) {
        return res.status(401).json({
            message: "Not Authorized",
        });
    }
    const user = yield user_1.default.collection.findOne({
        "account.username": username,
        "account.sessionId": sessionId,
    });
    if (user === null) {
        return res.status(401).json({
            message: "Not Authorized",
        });
    }
    // pass session data and userId to succeeding middlewares
    res.locals.username = username;
    res.locals.sessionId = sessionId;
    res.locals.userId = user._id.toString();
    res.locals.user = user;
    return next();
});
exports.default = authorize;
