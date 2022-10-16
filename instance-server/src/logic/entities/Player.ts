import Entity from "./Entity";

class Player extends Entity {
  constructor(characterData: any) {
    super(characterData.resources.max_hp, 2);
  }
}

export default Player;