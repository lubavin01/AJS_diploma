import Character from '../Character';
import {Bowman} from '../CharacterClasses';

test('new Character() causes an error', () => {
  expect(() => {new Character()}).toThrow();
});

test('new Bowman() is correct', () => {
  expect(new Bowman()).toBeDefined();
});