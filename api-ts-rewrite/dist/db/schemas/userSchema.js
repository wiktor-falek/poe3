"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    account: joi_1.default.object({
        username: joi_1.default.string()
            .alphanum()
            .min(6)
            .max(30)
            .required(),
        email: joi_1.default.string()
            .min(6)
            .max(254)
            .required(),
        hasConfirmedEmail: joi_1.default.bool()
            .default(false),
        registrationTimestamp: joi_1.default.number()
            .integer()
            .default(Date.now()),
        sessionId: joi_1.default.string()
            .default(null),
        characterLimit: joi_1.default.number()
            .integer()
            .min(12)
            .max(36)
            .default(12)
    }),
    social: joi_1.default.object({
        friends: joi_1.default.array().default([])
    }),
    shared_stash: joi_1.default.array()
        .default(new Array(20).fill(null)),
});
exports.default = userSchema;
