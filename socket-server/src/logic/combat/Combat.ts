import Enemy from "./Enemy";
import Entity from "./Entity";
import Player from "./Player";

class Combat {
  turn: number;
  allyParty: Array<Entity | Player>;
  enemyParty: Array<Entity>;
  turnOrder: Array<number>;
  waitingForPlayerAction: boolean;
  gen: Generator<boolean | null> | null;
  logs: Array<any>;
  recentLogs: Array<any>;
  constructor(allyParty: Array<Entity>, enemyParty: Array<Entity>) {
    this.turn = 0;
    this.allyParty = allyParty;
    this.enemyParty = enemyParty;
    this.turnOrder = this.createTurnOrder();

    this.waitingForPlayerAction = false;

    this.gen = null;

    this.logs = [];
    this.recentLogs = [];
  }

  public get hasEnded(): boolean {
    const aliveAllies = this.allyParty.filter((entity) => entity.isAlive);
    const aliveEnemies = this.enemyParty.filter((entity) => entity.isAlive);

    const ended = aliveAllies.length === 0 || aliveEnemies.length === 0;
    return ended;
  }

  public get whoWon(): "ally" | "enemy" | null {
    const aliveAllies = this.allyParty.filter((entity) => entity.isAlive);
    const aliveEnemies = this.enemyParty.filter((entity) => entity.isAlive);
    if (aliveAllies.length === 0) {
      return "enemy";
    }
    if (aliveEnemies.length === 0) {
      return "ally";
    }
    return null;
  }

  getEntityById(id: number) {
    for (const entity of [...this.allyParty, ...this.enemyParty]) {
      if (entity.id === id) {
        return entity;
      }
    }
    return null;
  }

  getEnemyById(id: number) {
    for (const entity of this.enemyParty) {
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
    // restore action points of each entity
    for (const entity of [...this.allyParty, ...this.enemyParty]) {
      entity.actionPoints.ap = entity.actionPoints.maxAp;
    }

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
        if (action != null) {
          if (action.type === "error") {
            // TODO: handle error
          }
          this.addLog(action);
        }

        yield false;
      }
      if (entity instanceof Player) {
        this.waitingForPlayerAction = true;
        yield true;
      }
    }

    // turn ended
    this.waitingForPlayerAction = false;
    this.addLog({ type: "turn-end", message: "Turn has ended" });
    yield null;
  }

  addLog(log: any): void {
    this.logs.push(log);
    this.recentLogs.push(log);
  }

  getRecentLogsAndClear(): Array<any> {
    const logs = [...this.recentLogs];
    this.recentLogs = [];
    return logs;
  }
}

export default Combat;
