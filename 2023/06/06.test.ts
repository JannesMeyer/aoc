import { expect, test } from 'bun:test';
import { multiply, parseInts, readLines } from '../../utils';

const ex1 = await readLines('ex1.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('6.1', () => {
  expect(part1(ex1)).toBe(288);
  expect(part1(input)).toBe(503424);
});

test('6.2', () => {
  expect(part2(ex1)).toBe(71503);
  expect(part2(input)).toBe(32607562);
});

function part1(input: string[]) {
  const [times, distances] = input.map(parseInts);
  return times.map((t, i) => getRecordChances(t, distances[i])).reduce(multiply);
}

function part2(input: string[]) {
  const [[time], [distance]] = input.map((l) => parseInts(l.replace(/\s+/g, '')));
  return getRecordChances(time, distance);
}

function getRecordChances(t: number, d: number) {
  const x = Math.sqrt((t ** 2) - (4 * d));
  const low = (t - x) / 2;
  const high = (t + x) / 2;
  return (Number.isInteger(high) ? high - 1 : Math.trunc(high)) - Math.trunc(low);
}
