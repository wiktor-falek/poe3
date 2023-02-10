import Enemy from "./Enemy";
import Entity from "./Entity";
import Player from "./Player";

interface CombatLog {}

class Combat {
  turn: number;
  allyParty: Array<Entity | Player>;
  enemyParty: Array<Entity>;
  turnOrder: Array<number>;
  waitingForPlayerAction: boolean;
  logs: Array<CombatLog>;
  gen: Generator<boolean | null> | null;
  constructor(allyParty: Array<Entity>, enemyParty: Array<Entity>) {
    this.turn = 0;
    this.allyParty = allyParty;
    this.enemyParty = enemyParty;
    this.turnOrder = this.createTurnOrder();

    this.waitingForPlayerAction = false;

    this.gen = null;

    this.logs = [];
  }

  public get hasEnded(): boolean {
    const aliveAllies = this.allyParty.filter((entity) => entity.isAlive);
    const aliveEnemies = this.enemyParty.filter((entity) => entity.isAlive);

    const ended = aliveAllies.length === 0 || aliveEnemies.length === 0;
    return ended;
  }

  getEntityById(id: number) {
    for (const entity of [...this.allyParty, ...this.enemyParty]) {
      if (entity.id === id) {
        return entity;
      }
    }
    return null;
  }

  getPlayerByUsername(username: string): Player | null {
    const result = this.allyParty.find((entity) => {
      if (!(entity instanceof Player)) {
        return false;
      }
      return entity.username === username;
    });
    return (result as Player) ?? null;
  }

  getPlayerByName(characterName: string): Player | null {
    const result = this.allyParty.find((entity) => {
      if (!(entity instanceof Player)) {
        return false;
      }
      return entity.name === characterName;
    });
    return (result as Player) ?? null;
  }

  createTurnOrder() {
    // this mutates, should make a deepcopy but it's temporary anyways
    const shuffleArray = (array: Array<any>) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    const entities = [...this.allyParty, ...this.enemyParty];

    // TODO: make odds favor entities with higher speed attribute
    const sortedEntities = shuffleArray(entities);

    return sortedEntities.map((entity) => entity.id!);
  }

  next() {
    return this.gen!.next();
  }

  startTurn() {
    this.turn++;
    this.gen = this.turnGen();
    return this.gen;
  }

  /*
  true = player action
  false = enemy action
  null = turn ended
  */
  *turnGen(): Generator<boolean | null> {
    for (const id of this.turnOrder) {
      const entity = this.getEntityById(id);
      if (entity instanceof Enemy) {
        const action = entity.takeAction(this.allyParty, this.enemyParty);
        if (action.type === "error") {
          // TODO: handle error
        }
        this.logs.push({ message: action.message });
        yield false;
      }
      if (entity instanceof Player) {
        this.waitingForPlayerAction = true;
        yield true;
      }
    }

    // turn ended
    this.waitingForPlayerAction = false;
    this.logs.push({ message: "Turn has ended" });
    yield null;
  }
}

export default Combat;
