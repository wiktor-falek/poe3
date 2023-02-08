import Enemy from "./Enemy";
import Entity from "./Entity";
import Player from "./Player";

interface CombatLog {}

class Combat {
  turn: number;
  allyParty: Array<Entity>;
  enemyParty: Array<Entity>;
  turnOrder: Array<number>;
  hasEnded: boolean;
  waitingForPlayerAction: boolean;
  logs: Array<CombatLog>;
  gen: Generator<boolean | null> | null;
  constructor(allyParty: Array<Entity>, enemyParty: Array<Entity>) {
    this.turn = 0;
    this.allyParty = allyParty;
    this.enemyParty = enemyParty;
    this.turnOrder = this.createTurnOrder();

    this.hasEnded = false;
    this.waitingForPlayerAction = false;

    this.logs = [];
    this.gen = null;
  }

  getEntityById(id: number) {
    let result = null;
    for (const entity of [...this.allyParty, ...this.enemyParty]) {
      if (entity.id === id) {
        result = entity;
        break;
      }
    }
    return result;
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
        // entity.takeAction()

        // test log
        this.logs.push({ message: "Rat attacked Apdo and dealt 1 damage" });
        yield false;
      }
      if (entity instanceof Player) {
        // player action is required
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
