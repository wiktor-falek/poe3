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
const Mongo_js_1 = __importDefault(require("../Mongo.js"));
const user_js_1 = __importDefault(require("../schemas/user.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    static getUserByName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.collection.findOne({
                "account.username": username,
            });
            return user;
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
    static usernameOrEmailIsTaken(username, email) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static register(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInput = {
                account: { username, email },
            };
            // return { ok: true, value: "bruh"}
            try {
                yield user_js_1.default.validateAsync(userInput);
            }
            catch (err) {
                return { ok: false, error: err };
            }
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hash = yield bcrypt_1.default.hash(password, salt);
            const newUserData = {
                account: { username, email, hash },
            };
            const result = yield this.collection.insertOne(newUserData);
            if (result.acknowledged) {
                return { ok: true };
            }
            return { ok: false, error: "Database write failed" };
        });
    }
}
_a = User;
User.db = Mongo_js_1.default.getClient().db("game");
User.collection = _a.db.collection("users");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield User.register("a", "b", "c");
        // if (!data.ok) {
        // data.error;
        // }
        if (data.ok) {
            data.value;
        }
    });
})();
// User.getUserByName("test")
// class User {
//   constructor(db) {
//     this.collection = db.collection("users");
//   }
//   async getUserByName(username) {
//     const user = await this.collection.findOne({
//       "account.username": username,
//     });
//     return user;
//   }
//   /**
//    * @param {String} email
//    * @returns boolean
//    */
//   async emailIsTaken(email) {
//     const user = await this.collection.findOne({
//       "account.confirmedEmail": email,
//     });
//     if (user === null) {
//       return false;
//     }
//     return true;
//   }
//   /**
//    *
//    * @param {String} username
//    * @param {String} email
//    * @returns {
//    *   "usernameIsTaken": Boolean,
//    *   "emailIsTaken": Boolean
//    * }
//    */
//   async usernameOrEmailIsTaken(username, email) {
//     const user = await this.collection.findOne({
//       $or: [
//         { "account.username": username },
//         { "account.confirmedEmail": email },
//       ],
//     });
//     const results = {
//       usernameIsTaken: false,
//       emailIsTaken: false,
//     };
//     if (user !== null) {
//       if (user.account.username === username) {
//         results.usernameIsTaken = true;
//       }
//       if (user.account.confirmedEmail === email) {
//         results.emailIsTaken = true;
//       }
//     }
//     return results;
//   }
//   async register(username, password, email) {
//     const initialUserData = {
//       account: { username: username, email: email },
//     };
//     let userData;
//     try {
//       userData = await userSchema.validateAsync(initialUserData);
//     } catch (err) {
//       logger.error(`register validation failed, ${err}`);
//       return null;
//     }
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hash = await bcrypt.hash(password, salt);
//     userData.account.hash = hash;
//     try {
//       const newUser = await this.collection.insertOne(userData);
//     } catch (e) {
//       logger.error(`failed to save new user, ${e}`);
//       return null;
//     }
//     return userData;
//   }
// }
// export default new User(Mongo.db);
