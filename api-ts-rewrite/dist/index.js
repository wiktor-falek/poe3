"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
process.env.NODE_ENV =
    process.env.NODE_ENV === "production" ? "production" : "development";
const PORT = 3000;
app_js_1.default.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
