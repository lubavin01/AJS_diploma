import themes from './themes';
const { prairie, desert, arctic, mountain } = themes;
const levels = [prairie, desert, arctic, mountain];

import cursors from './cursors';
const { auto, pointer, crosshair, notallowed } = cursors;

import Board from './Board';
import GameState from './GameState';
import AI from './Ai';

export default class GameController {
  constructor(gamePlay, stateService) {

    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState({ boardSize: this.gamePlay.boardSize });
    this.ai = new AI(this, this.gamePlay);

    Board.boardSize = this.gamePlay.boardSize;
    Board.playerTeam = this.gameState.playerTeam;
    Board.enemyTeam = this.gameState.enemyTeam;

    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this));
  }

  init() {
    if (this.gameState === null) {
      this.gameState = new GameState({ boardSize: this.gamePlay.boardSize });
    }

    Board.positionedCharacters = this.gameState.positionedCharacters;

    const levelIndex = this.gameState.level % 4;
    const theme = levels[levelIndex];
    this.gamePlay.drawUi(theme);
    this.gamePlay.redrawPositions(this.gameState.positionedCharacters);
  }

  async onCellClick(index) {
    const info = this.getCellInfo(index);
    if (info === null) {
      // not available
      return;
    } else if (info.positionedCharacter && info.attack) {
      await this.attack(info.positionedCharacter);

      const roundCode = this.checkRoundEnd();
      if (roundCode === 1) {
        this.startNewRound();
      } else if (roundCode === -1) {
        this.restartRound();
      } else {
        this.makeComputerMove()
      }

      //this.gameState.toggleCurrentMove();

    } else if (info.positionedCharacter && info.select) {
      this.gamePlay.selectChar(info.positionedCharacter);

    } else if (info.move) {
      this.move(index);

      const roundCode = this.checkRoundEnd();
      if (roundCode === 1) {
        this.startNewRound();
      } else if (roundCode === -1) {
        this.restartRound();
      } else {
        this.makeComputerMove()
      }
    }
  }

  onCellEnter(index) {
    const info = this.getCellInfo(index);
    if (info === null) {
      // not available
      this.gamePlay.setCursor(notallowed);
    } else if (info.positionedCharacter && info.attack) {
      this.gamePlay.setCursor(crosshair);
      this.gamePlay.selectCell(index, 'red');
      this.gamePlay.showCharacterTooltip(info.positionedCharacter, index);
    } else if (info.positionedCharacter && info.select) {
      this.gamePlay.setCursor(pointer);
      this.gamePlay.selectCell(index, 'yellow');
      this.gamePlay.showCharacterTooltip(info.positionedCharacter, index);
    } else if (info.move) {
      this.gamePlay.setCursor(pointer);
      //this.gamePlay.selectCell(index, 'green');
      this.gamePlay.selectCellGreen(index);
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);

    if (this.gamePlay.selectedChar && index === this.gamePlay.selectedChar.position) {
      return;
    }

    this.gamePlay.deselectCell(index);
  }

  onSaveGameClick() {
    const state = {
      enemyTeam: this.gameState.enemyTeam,
      playerTeam: this.gameState.playerTeam,
      currentMove: this.gameState.currentMove,
      level: this.gameState.level,
      boardSize: this.boardSize
    };

    this.stateService.save(state);

    console.log('game saved');
  }

  onLoadGameClick() {

    const state = this.stateService.load();
    if (state) {
      this.gameState = GameState.from(state);
    }
    this.init();
  }

  checkRoundEnd() {
    if (!this.gameState.enemyTeam.find(i => !i.character.dead)) {
      console.log('player won round');

      return 1;
    }

    if (!this.gameState.playerTeam.find(i => !i.character.dead)) {
      console.log('player lost round');
      this.restartRound();
      return -1;
    }

    return 0;
  }

  async attack(victimPositionedCharacter) {
    const damage = Math.max(this.gamePlay.selectedChar.character.attack - victimPositionedCharacter.character.defence, this.gamePlay.selectedChar.character.attack * 0.1);
    await this.gamePlay.showDamage(victimPositionedCharacter.position, damage);
    victimPositionedCharacter.character.health -= damage;
    if (victimPositionedCharacter.character.health <= 0) {
      victimPositionedCharacter.character.dead = true;
    }
    this.gamePlay.deselectChar();

    this.gamePlay.redrawPositions(this.gameState.positionedCharacters);
  }

  move(index) {
    // make your move
    this.gamePlay.deselectCell(this.gamePlay.selectedChar.position); // remove yellow select before changing

    this.gamePlay.selectedChar.position = index;
    this.gamePlay.redrawPositions(this.gameState.positionedCharacters);

    this.gamePlay.deselectChar();
  }

  isVictimCharacter(posCharacter) {
    const enemyTeam = this.gameState.currentMove === 'computer' ? this.gameState.playerTeam : this.gameState.enemyTeam;
    return enemyTeam.includes(posCharacter);
  }

  findCharacterOnIndex(index) {
    return this.gameState.positionedCharacters.find((i) => i.position === index && !i.character.dead);
  }

  getCellInfo(index) {
    const posCharacter = this.findCharacterOnIndex(index, this.gameState.currentMove);
    if (posCharacter) {
      const isVictimCharacter = this.isVictimCharacter(posCharacter);
      if (isVictimCharacter) {
        if (!Board.availableToAttack(index, this.gamePlay.selectedChar, this.gamePlay.boardSize)) {
          return null;
        }

        if (!this.gamePlay.selectedChar) {
          return null;
        }

        return {
          positionedCharacter: posCharacter,
          attack: true
        };

      } else {
        return {
          positionedCharacter: posCharacter,
          select: true
        };
      }
    } else {
      if (!this.gamePlay.selectedChar) {
        return null;
      }

      if (!Board.availableToMove(index, this.gamePlay.selectedChar, this.gamePlay.boardSize)) {
        return null;
      }

      return {
        move: true,
      }
    }
  }

  startNewRound() {

    this.gameState.level += 1;
    this.gameState.playerTeam.forEach(i => {
      i.character.level += 1;
      i.character.health = 100;
    });

    this.gameState.changePlayerTeamToInitialPosition();

    // переинициализируем состояние игры
    this.gameState = new GameState({
      level: this.gameState.level,
      playerTeam: this.gameState.playerTeam,
    });

    // перерисовываем
    this.init();
  }

  restartRound() {

  }

  makeComputerMove() {
    this.ai.aiMove();
  }

}
