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
exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const joi_1 = __importDefault(require("joi"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email } = req.body;
        const schema = joi_1.default.object().keys({
            username: joi_1.default.string().trim().required().min(6).max(30),
            password: joi_1.default.string().required().min(8).max(128),
            email: joi_1.default.string().email().min(6).max(254),
        });
        try {
            yield schema.validateAsync(req.body);
        }
        catch (_a) {
            return res.status(422).json({ error: "Invalid data" });
        }
        const result = yield user_1.default.register(username, password, email);
        if (!result.ok) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json({
            message: `Successfully created an account with username '${username}'`,
        });
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        return res.status(501);
        // User.login()
    });
}
function verify(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        return res.status(501);
        // User.verify()
    });
}
