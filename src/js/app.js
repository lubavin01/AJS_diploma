/**
 * Entry point of app: don't change this
 */
import GamePlay from './GamePlay';
import GameController from './GameController';
import GameStateService from './GameStateService';
import Character from './Character';
import {Bowman, Swordsman} from './CharacterClasses';

import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

// don't write your code here
const team = generateTeam([Bowman, Swordsman], 1, 2);
const poschars = [new PositionedCharacter(team[0], 0), new PositionedCharacter(team[1], 1)];

gamePlay.redrawPositions(poschars);






