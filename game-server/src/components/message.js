"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMessage = exports.PartyMessage = exports.GlobalMessage = exports.ServerMessage = void 0;
var BaseMessage = /** @class */ (function () {
    function BaseMessage(content, sender, group) {
        this.content = content;
        this.sender = sender;
        this.group = group;
        // console.log(this);
    }
    return BaseMessage;
}());
var ServerMessage = /** @class */ (function (_super) {
    __extends(ServerMessage, _super);
    function ServerMessage(content) {
        return _super.call(this, content, "SERVER", "SYSTEM") || this;
    }
    return ServerMessage;
}(BaseMessage));
exports.ServerMessage = ServerMessage;
var GlobalMessage = /** @class */ (function (_super) {
    __extends(GlobalMessage, _super);
    function GlobalMessage(content, sender) {
        return _super.call(this, content, sender !== null && sender !== void 0 ? sender : "SERVER", "GLOBAL") || this;
    }
    return GlobalMessage;
}(BaseMessage));
exports.GlobalMessage = GlobalMessage;
var PartyMessage = /** @class */ (function (_super) {
    __extends(PartyMessage, _super);
    function PartyMessage(content, sender) {
        return _super.call(this, content, sender !== null && sender !== void 0 ? sender : "SERVER", "PARTY") || this;
    }
    return PartyMessage;
}(BaseMessage));
exports.PartyMessage = PartyMessage;
var GuildMessage = /** @class */ (function (_super) {
    __extends(GuildMessage, _super);
    function GuildMessage(content, sender) {
        return _super.call(this, content, sender !== null && sender !== void 0 ? sender : "SERVER", "GUILD") || this;
    }
    return GuildMessage;
}(BaseMessage));
exports.GuildMessage = GuildMessage;
