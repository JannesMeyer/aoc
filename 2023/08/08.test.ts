import { expect, test } from 'bun:test';
import { readLines } from '../../utils';

const ex1 = await readLines('ex1.txt', import.meta);
const ex2 = await readLines('ex2.txt', import.meta);
const ex3 = await readLines('ex3.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('8.1', () => {
  expect(part1(ex1)).toBe(2);
  expect(part1(ex2)).toBe(6);
  expect(part1(input)).toBe(20569);
});

test('8.2', () => {
  expect(part2(ex3)).toBe(6);
  expect(part2(input)).toBe(21366921060721);
});

function part1([instructions, , ...m]: string[]) {
  return getSteps(parseMap(m), 'AAA', instructions, (p) => p === 'ZZZ');
}

function part2([instructions, , ...m]: string[]) {
  const map = parseMap(m);
  const end = (p: string) => p.endsWith('Z');
  return lcm(Object.keys(map).filter((p) => p.endsWith('A')).map((p) => getSteps(map, p, instructions, end)));
}

function getSteps(map: Record<string, Record<string, string>>, p: string, instructions: string, end: (p: string) => boolean) {
  let i = 0;
  while (!end(p)) {
    p = map[p][instructions[i++ % instructions.length]];
  }
  return i;
}

function parseMap(input: string[]) {
  return Object.fromEntries(input.map((l) => l.match(/\w{3}/g)!).map(([n, L, R]) => [n, { L, R }]));
}

function lcm(numbers: number[]) {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

/** Euclid's algorithm for the greatest common divisor */
function gcd(a: number, b: number) {
  while (b) {
    [b, a] = [a % b, b];
  }
  return a;
}
