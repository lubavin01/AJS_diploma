import { randomDecimal } from '../generators';

test('random decimal', () => {
  const res = [];
  for (let i = 0; i < 100; i++) {
    const value = randomDecimal(4, 7);
    res.push(value);
  };

  expect(res).toContain(4);
  expect(res).toContain(5);
  expect(res).toContain(6);
  expect(res).toContain(7);
});