import Enemy from "./Enemy";
import Entity from "./Entity";

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

  *nextStep() {
    for (const entity of this.turnOrder) {
      if (entity instanceof Enemy) {

      }
    }
  }


}

export default Combat;
