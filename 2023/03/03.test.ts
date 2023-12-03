import { expect, test } from 'bun:test';
import { multiply, readLines, sum, throwError } from '../../utils';

type Match = { text: string; start: number; end: number; line: number };

const ex1 = await readLines('ex1.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('2023 3.1', () => {
  expect(sumParts(ex1)).toBe(4361);
  expect(sumParts(input)).toBe(556057);
});

test('2023 3.2', () => {
  expect(sumGearRatios(ex1)).toBe(467835);
  expect(sumGearRatios(input)).toBe(82824352);
});

function sumParts(input: string[]) {
  const numbers = findAll(input, /\d+/g);
  const symbols = findAll(input, /[^.\d]/g);
  return numbers.filter((n) => symbols.some((s) => isAdjacent(n, s))).map((n) => Number(n.text)).reduce(sum);
}

function sumGearRatios(input: string[]) {
  const numbers = findAll(input, /\d+/g);
  const gears = findAll(input, /\*/g);
  return gears.map((g) => {
    const parts = numbers.filter((n) => isAdjacent(g, n));
    return parts.length === 2 ? parts.map((p) => Number(p.text)).reduce(multiply) : 0;
  }).reduce(sum);
}

function isAdjacent(a: Match, b: Match) {
  return a.line - 1 <= b.line && a.line + 1 >= b.line && (a.start <= b.end) && (a.end >= b.start);
}

function findAll(lines: string[], regex: RegExp): Match[] {
  return lines.flatMap((line, i) =>
    Array.from(line.matchAll(regex), ({ [0]: text, index: start = throwError() }) => ({ text, start, end: start + text.length, line: i }))
  );
}
