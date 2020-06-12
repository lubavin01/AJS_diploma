import themes from './themes';
const {prairie, desert, arctic, mountain} = themes;

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {

    console.log('game controller - init');

    this.gamePlay.drawUi(prairie);

    this.gamePlay.addCellEnterListener(this.onCellEnter);
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    console.log('cell enter', index);
    
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
