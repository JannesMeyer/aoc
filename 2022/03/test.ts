import { chunks, equal, intersection, readLines, single, sum, throwError } from '../utils.ts';

const lines = await readLines('input.txt', import.meta.url);

Deno.test('3.1', () => {
  const priorities = lines.map((line) => getPriority(single(intersection(...chunks(line, Math.floor(line.length / 2))))));
  equal(priorities.reduce(sum), 7597);
});

Deno.test('3.2', () => {
  equal(chunks(lines, 3).map((g) => getPriority(single(intersection(...g)))).reduce(sum), 2607);
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
