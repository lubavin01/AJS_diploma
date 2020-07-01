import Character from './Character';

export class Bowman extends Character {
  constructor(level) {
    super(level);

    this.attack = 250;
    this.defence = 25;
    this.type = 'bowman';
    this.moveRange = 2;
    this.attackRange = 2;
  }
}

export class Swordsman extends Character {
  constructor(level) {
    super(level);

    this.attack = 400;
    this.defence = 10;
    this.type = 'swordsman';
    this.moveRange = 4;
    this.attackRange = 1;
  }
}

export class Magician extends Character {
  constructor(level) {
    super(level);

    this.attack = 100;
    this.defence = 40;
    this.type = 'magician';
    this.moveRange = 1;
    this.attackRange = 4;
  }
}

export class Vampire extends Character {
  constructor(level) {
    super(level);

    this.attack = 25;
    this.defence = 25;
    this.type = 'vampire';
    this.moveRange = 2;
    this.attackRange = 2;
  }
}

export class Undead extends Character {
  constructor(level) {
    super(level);

    this.attack = 40;
    this.defence = 10;
    this.type = 'undead';
    this.moveRange = 4;
    this.attackRange = 1;
  }
}

export class Daemon extends Character {
  constructor(level) {
    super(level);

    this.attack = 10;
    this.defence = 40;
    this.type = 'zombie';
    this.moveRange = 1;
    this.attackRange = 4;
  }
}