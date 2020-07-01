
import PositionedCharacter from './PositionedCharacter';
import Board from './Board';

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {

  while (true) {
    const typeIndex = randomDecimal(0, allowedTypes.length - 1);
    const Type = allowedTypes[typeIndex];
    yield new Type(maxLevel);
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount, xCoordMin, xCoordMax) {
  const team = [];
  const generator = characterGenerator(allowedTypes, maxLevel);
  const usedCoords = [];
  for (let i = 1; i <= characterCount; i++) {
    const character = generator.next().value;
    const { xCoord, yCoord } = randomCoord(xCoordMin, xCoordMax, 0, 7, usedCoords);
    const index = Board.getIndex(xCoord, yCoord, 8);

    team.push(new PositionedCharacter(character, index));
    usedCoords.push(`${xCoord},${yCoord}`);
  }

  return team;
}

export function randomDecimal(min, max) {
  const interval = max - min + 1;
  const rnd = Math.random() * interval;
  return Math.floor(rnd + min);
}

function randomCoord(xCoordMin, xCoordMax, yCoordMin, yCoordMax, usedCoords) {
  let xCoord = null;
  let yCoord = null;
  while (xCoord === null) {
    xCoord = randomDecimal(xCoordMin, xCoordMax);
    yCoord = randomDecimal(yCoordMin, yCoordMax);

    debugger;

    if (!usedCoords.find(i => i === `${xCoord},${yCoord}`)) {
      return {xCoord, yCoord};
    }

    xCoord = null;
    yCoord = null;
  }
}
