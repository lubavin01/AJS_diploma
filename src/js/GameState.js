import { Bowman, Swordsman, Magician, Vampire, Undead, Daemon } from './CharacterClasses';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';

export default class GameState {
  constructor({ boardSize, positionedCharacters, currentMove, level }) {

    this.boardSize = boardSize || 8;
    this.positionedCharacters = positionedCharacters;
    if (!this.positionedCharacters) {
      this.playerTeam = generateTeam([Bowman, Swordsman, Magician], 1, 2, 0, 1);
      this.enemyTeam = generateTeam([Vampire, Undead, Daemon], 1, 2, 6, 7);
      this.positionedCharacters = [...this.playerTeam, ...this.enemyTeam];
    }

    this.currentMove = currentMove || 'player'; // player || computer
    this.level = level || 1;
  }

  toggleCurrentMove() {
    this.currentMove = this.currentMove === 'player' ? 'computer' : 'player';
    console.log('current move', this.currentMove);

  }


  static from(object) {
    return new this(object);
  }
}
