class Entity {
  life: number;
  damage: number;
  constructor(life: number, damage: number) {
    this.life = life;
    this.damage = damage;
  }

  get isAlive(): boolean {
    return this.life > 0;
  }
}

export default Entity;
