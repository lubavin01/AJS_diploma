import {calcTileType} from '../utils';

test ('calcTileType - boardSize 4', () => {
  const boardSize = 4;
  expect(calcTileType(0, boardSize)).toBe('top-left');
  expect(calcTileType(3, boardSize)).toBe('top-right');
  expect(calcTileType(1, boardSize)).toBe('top');
  expect(calcTileType(4, boardSize)).toBe('left');
  expect(calcTileType(7, boardSize)).toBe('right');
  expect(calcTileType(12, boardSize)).toBe('bottom-left');
  expect(calcTileType(15, boardSize)).toBe('bottom-right');
  expect(calcTileType(14, boardSize)).toBe('bottom');
})