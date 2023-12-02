import { expect, test } from 'bun:test';
import { asInteger, doubleLineBreak, lineBreak, read, sum } from '../utils';

const input = await read('input.txt', import.meta);
const elves = input.split(doubleLineBreak).map((g) => g.split(lineBreak).map(asInteger).reduce(sum));

test('1.1', () => {
  expect(Math.max(...elves)).toEqual(70369);
});

test('1.2', () => {
  expect(elves.slice().sort((a, b) => b - a).slice(0, 3).reduce(sum)).toEqual(203002);
});
