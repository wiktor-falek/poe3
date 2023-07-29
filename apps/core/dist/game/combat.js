var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Combat_turnIdx, _Combat_turnOrder;
import { shuffle } from "pyrand";
import Enemy from "./entities/enemy.js";
class Combat {
    constructor(players, enemies) {
        _Combat_turnIdx.set(this, void 0);
        _Combat_turnOrder.set(this, void 0);
        this.players = players;
        this.enemies = enemies;
        __classPrivateFieldSet(this, _Combat_turnIdx, 0, "f");
        const turnOrder = [...this.players, ...this.enemies];
        shuffle(turnOrder);
        __classPrivateFieldSet(this, _Combat_turnOrder, turnOrder, "f");
    }
    get currentTurn() {
        return __classPrivateFieldGet(this, _Combat_turnOrder, "f")[__classPrivateFieldGet(this, _Combat_turnIdx, "f")];
    }
    get playersWon() {
        return this.enemies.filter((enemy) => enemy.isAlive).length === 0;
    }
    get enemiesWon() {
        return this.players.filter((player) => player.isAlive).length === 0;
    }
    get hasConcluded() {
        return this.enemiesWon || this.playersWon;
    }
    begin() {
        // ...
    }
    continue() {
        // TODO: return all the actions of enemies
        let entity = this.nextEntity();
        while (!this.hasConcluded && entity instanceof Enemy) {
            const enemyAction = entity.randomAction(this.players);
            // have Enemy choose an action
        }
    }
    playerAction() { }
    nextEntity() {
        var _a;
        if (__classPrivateFieldGet(this, _Combat_turnIdx, "f") > __classPrivateFieldGet(this, _Combat_turnOrder, "f").length - 1) {
            __classPrivateFieldSet(this, _Combat_turnIdx, 0, "f"); // circular array
        }
        const entity = __classPrivateFieldGet(this, _Combat_turnOrder, "f")[__classPrivateFieldGet(this, _Combat_turnIdx, "f")];
        __classPrivateFieldSet(this, _Combat_turnIdx, (_a = __classPrivateFieldGet(this, _Combat_turnIdx, "f"), _a++, _a), "f");
        return entity;
    }
}
_Combat_turnIdx = new WeakMap(), _Combat_turnOrder = new WeakMap();
export default Combat;
