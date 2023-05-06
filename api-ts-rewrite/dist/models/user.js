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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const Mongo_js_1 = __importDefault(require("../Mongo.js"));
const userSchema = joi_1.default.object({
    account: joi_1.default.object({
        username: joi_1.default.string().alphanum().min(6).max(30).required(),
        email: joi_1.default.string().min(6).max(254).required(),
        hasConfirmedEmail: joi_1.default.bool().default(false),
        registrationTimestamp: joi_1.default.number().integer().default(Date.now()),
        sessionId: joi_1.default.string().default(null),
        characterLimit: joi_1.default.number().integer().min(12).max(36).default(12),
    }),
    social: joi_1.default.object({
        friends: joi_1.default.array().default([]),
    }),
    shared_stash: joi_1.default.array().default(new Array(20).fill(null)),
});
exports.userSchema = userSchema;
class User {
    static findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.collection.findOne({
                "account.username": username,
            });
            return user;
        });
    }
    static usernameIsTaken(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.collection.findOne({
                "account.username": username,
            });
            return user !== null;
        });
    }
    static emailIsTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.collection.findOne({
                "account.email": email,
                "account.hasConfirmedEmail": true,
            });
            return user !== null;
        });
    }
    static usernameAndEmailIsAvailable(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.collection.findOne({
                $or: [
                    { "account.username": username },
                    { "account.email": email, "account.hasConfirmedEmail": true },
                ],
            });
            if ((user === null || user === void 0 ? void 0 : user.account.username) === username) {
                return { ok: false, error: "Username is already in use" };
            }
            if ((user === null || user === void 0 ? void 0 : user.account.email) === email) {
                return { ok: false, error: "Email is already in use" };
            }
            return { ok: true };
        });
    }
    static register(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInput = {
                account: { username, email },
            };
            const newUserData = yield userSchema.validateAsync(userInput);
            if (newUserData.error) {
                const error = newUserData.error.details[0].message;
                return { ok: false, error };
            }
            const available = yield this.usernameAndEmailIsAvailable(username, email);
            if (!available.ok) {
                return { ok: false, error: available.error };
            }
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hash = yield bcrypt_1.default.hash(password, salt);
            newUserData.account.hash = hash;
            const result = yield this.collection.insertOne(newUserData);
            if (!result.acknowledged) {
                return { ok: false, error: "Database write failed" };
            }
            return { ok: true };
        });
    }
    static login(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInput = {
                account: { username, email },
            };
            return { ok: false, error: "Not Implemented" };
        });
    }
}
_a = User;
User.db = Mongo_js_1.default.getClient().db("game");
User.collection = _a.db.collection("users");
exports.default = User;
