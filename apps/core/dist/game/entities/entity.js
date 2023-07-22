class Entity {
    constructor() { }
    get isAlive() {
        return this.resources.hp > 0;
    }
}
export default Entity;
