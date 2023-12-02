import { expect, test } from 'bun:test';
import { readLines, sum } from '../../utils';

type Set = { red?: number; green?: number; blue?: number };

const ex1 = await readLines('ex1.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('2023 2.1', () => {
  expect(ex1.map((s, i) => isPossible(s) ? i + 1 : 0).reduce(sum)).toBe(8);
  expect(input.map((s, i) => isPossible(s) ? i + 1 : 0).reduce(sum)).toBe(2085);
});

test('2023 2.1', () => {
  expect(ex1.map(minPossiblePower).reduce(sum)).toBe(2286);
  expect(input.map(minPossiblePower).reduce(sum)).toBe(79315);
});

function isPossible(game: string): boolean {
  for (const { red = 0, green = 0, blue = 0 } of parseGame(game)) {
    if (red > 12 || green > 13 || blue > 14) return false;
  }
  return true;
}

function minPossiblePower(game: string) {
  let r = 0, g = 0, b = 0;
  for (const { red = 0, green = 0, blue = 0 } of parseGame(game)) {
    if (red > r) r = red;
    if (green > g) g = green;
    if (blue > b) b = blue;
  }
  return r * g * b;
}

function parseGame(game: string) {
  return game.split(': ')[1].split('; ').map((s): Set =>
    Object.fromEntries(
      s.split(', ').map((x) => {
        const [q, color] = x.split(' ');
        return [color, Number(q)];
      }),
    )
  );
}
