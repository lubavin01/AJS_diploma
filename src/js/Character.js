export default class Character {
  constructor(level, type = 'generic') {
    if (new.target === Character) {
      throw Error('can not use new Character()');
    }

    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    this.dead = false;
  }
}
