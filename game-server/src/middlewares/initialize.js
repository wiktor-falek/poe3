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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_js_1 = require("../db/models/user.js");
var joi_1 = require("joi");
var character_js_1 = require("../db/models/character.js");
var clientManager_js_1 = require("../components/client/clientManager.js");
var instanceManager_js_1 = require("../game/instance/instanceManager.js");
function initialize(socket, next) {
    return __awaiter(this, void 0, void 0, function () {
        var auth, schema, result, err, _a, sessionId, characterName, fetchUserPromise, fetchCharacterPromise, userWithId, characterWithId, err, err, err, client, _id, character, instanceId, instance;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    auth = socket.handshake.auth;
                    schema = joi_1.default.object({
                        sessionId: joi_1.default.string()
                            .regex(/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/)
                            .required(),
                        // username: Joi.string().required().min(6).max(30),
                        characterName: joi_1.default.string().required().min(3).max(24),
                    });
                    result = schema.validate(auth);
                    if (result.error) {
                        console.log(result.error);
                        err = new Error("Invalid session");
                        console.log(err.message);
                        // err.data = { content: "Additional details" };
                        return [2 /*return*/, next(err)];
                    }
                    _a = result.value, sessionId = _a.sessionId, characterName = _a.characterName;
                    fetchUserPromise = user_js_1.default.findBySessionId(sessionId);
                    fetchCharacterPromise = character_js_1.default.findByName(characterName);
                    return [4 /*yield*/, fetchUserPromise];
                case 1:
                    userWithId = _b.sent();
                    return [4 /*yield*/, fetchCharacterPromise];
                case 2:
                    characterWithId = _b.sent();
                    if (userWithId === null) {
                        err = new Error("User not found");
                        console.log("ERROR", err.message);
                        // err.data = { content: "Additional details" };
                        return [2 /*return*/, next(err)];
                    }
                    if (characterWithId === null) {
                        err = new Error("Character not found");
                        console.log("ERROR", err.message);
                        // err.data = { content: "Additional details" };
                        return [2 /*return*/, next(err)];
                    }
                    if (characterWithId.userId !== userWithId._id.toString()) {
                        err = new Error("What are you trying to do? ._.");
                        console.log("ERROR", err.message);
                        // err.data = { content: "Additional details" };
                        return [2 /*return*/, next(err)];
                    }
                    client = clientManager_js_1.default.getClientByUsername(userWithId.account.username);
                    if (client !== undefined) {
                        // update the socket reference of existing client
                        client.socket = socket;
                    }
                    // if existing character does not match currently selected character
                    // reinstantiate the client
                    if (client === undefined || !client.character._id.equals(characterWithId._id)) {
                        client = clientManager_js_1.default.createClient(userWithId, characterWithId, socket);
                    }
                    _id = characterWithId._id, character = __rest(characterWithId, ["_id"]);
                    socket.emit("character", character);
                    socket.data.isAuthenticated = true;
                    socket.data.client = client;
                    instanceId = client.instanceId;
                    console.log({ instanceId: client.instanceId });
                    console.log(instanceManager_js_1.default.instances);
                    if (instanceId !== null) {
                        instance = instanceManager_js_1.default.getInstance(instanceId);
                        if (instance !== undefined) {
                            client.socket.join(instance.room);
                            socket.emit("instance:set", instance);
                        }
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = initialize;
