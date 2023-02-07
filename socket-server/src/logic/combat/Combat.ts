import Enemy from "./Enemy";
import Entity from "./Entity";
import Player from "./Player";

class Combat {
  turn: number;
  allyParty: Array<Entity>;
  enemyParty: Array<Entity>;
  turnOrder: Array<Entity>;
  waitingForPlayerAction: boolean;
  constructor(allyParty: Array<Entity>, enemyParty: Array<Entity>) {
    this.turn = 0;
    this.allyParty = allyParty;
    this.enemyParty = enemyParty;
    this.turnOrder = this.createTurnOrder();
    this.waitingForPlayerAction = false;
  }

  createTurnOrder() {
    const entities = [...this.allyParty, ...this.enemyParty];

    // for now just decide order by amount of speed, without randomness
    return entities.sort((a, b) => a.attributes.speed - b.attributes.speed);
  }

  /*
  true = player action
  false = enemy action
  null = turn ended
  */
  *nextStep(): Generator<boolean | null> {
    for (const entity of this.turnOrder) {
      if (entity instanceof Enemy) {
        // entity.takeAction()
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
    yield null;
  }
}

export default Combat;
