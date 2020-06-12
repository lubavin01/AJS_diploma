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

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const team = [];
  const generator = characterGenerator(allowedTypes, maxLevel);
  for (let i = 1; i <= characterCount; i++) {
    team.push(generator.next().value);
  }

  return team;
}

export function randomDecimal(min, max) {
  const interval = max - min + 1;
  const rnd = Math.random() * interval;
  return Math.floor(rnd + min);
}
