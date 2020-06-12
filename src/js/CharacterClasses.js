import Character from './Character';

export class Bowman extends Character {
  constructor(level) {
    super(level);

    this.attack = 25;
    this.defence = 25;
  }
}

export class Swordsman extends Character {
  constructor(level) {
    super(level);

    this.attack = 40;
    this.defence = 10;
  }
}