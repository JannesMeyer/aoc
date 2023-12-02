import { expect, test } from 'bun:test';
import { chunks, intersection, readLines, single, sum, throwError } from '../../utils';

const lines = await readLines('input.txt', import.meta);

test('3.1', () => {
  const priorities = lines.map((line) => getPriority(single(intersection(...chunks(line, Math.floor(line.length / 2))))));
  expect(priorities.reduce(sum)).toEqual(7597);
});

test('3.2', () => {
  expect(chunks(lines, 3).map((g) => getPriority(single(intersection(...g)))).reduce(sum)).toEqual(2607);
});

const a = 'a'.codePointAt(0) ?? throwError();
const A = 'A'.codePointAt(0) ?? throwError();
const length = 26;

function getPriority(char: string) {
  const cp = char.codePointAt(0) ?? throwError();
  let res = cp - a;
  if (0 <= res && res < length) return res + 1;
  res = cp - A;
  if (0 <= res && res < length) return res + 1 + length;
  throw new Error(`Invalid input: ${char}`);
}
