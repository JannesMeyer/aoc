import { asInteger, doubleLineBreak, equal, lineBreak, read, sum } from '../utils.ts';

const input = await read('input.txt', import.meta.url);
const elves = input.split(doubleLineBreak).map((g) => g.split(lineBreak).map(asInteger).reduce(sum));

Deno.test('1.1', () => {
  equal(Math.max(...elves), 70369);
});

Deno.test('1.2', () => {
  equal(elves.slice().sort((a, b) => b - a).slice(0, 3).reduce(sum), 203002);
});
