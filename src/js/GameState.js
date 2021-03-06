import { Bowman, Swordsman, Magician, Vampire, Undead, Daemon } from './CharacterClasses';
import { generateTeam, changeCoords } from './generators';

import AI from './Ai';

export default class GameState {
  constructor({ boardSize, playerTeam, enemyTeam, currentMove, level }) {

    this.boardSize = boardSize || 8;
    this.level = level || 0;

    this.playerTeam = playerTeam;
    this.enemyTeam = enemyTeam;

    if (!this.playerTeam) {
      this.playerTeam = generateTeam([Bowman, Swordsman, Magician], this.level + 1, this.level + 2, 0, 1);
    }
    const missingChars = this.level - this.playerTeam.length + 2; // level 0 - 2 chars, level 1 - 3 chars
    if (missingChars > 0) {
      const missingCharsArray = generateTeam([Bowman, Swordsman, Magician], this.level + 1, missingChars, 0, 1);
      this.playerTeam = [...this.playerTeam, ...missingCharsArray];
    }

    if (!this.enemyTeam) {
      this.enemyTeam = generateTeam([Vampire, Undead, Daemon], this.level + 1, this.level + 2, 6, 7);
    }

    this.positionedCharacters = [...this.playerTeam, ...this.enemyTeam];
    this.currentMove = currentMove || 'player'; // player || computer

  }

  toggleCurrentMove() {
    this.currentMove = this.currentMove === 'player' ? 'computer' : 'player';
  }

  changePlayerTeamToInitialPosition() {
    this.playerTeam.forEach(i => {
      changeCoords(i, 0, 1);
    });
  }


  static from(object) {
    return new this(object);
  }
}
