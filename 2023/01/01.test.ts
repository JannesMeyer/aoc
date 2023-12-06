import { expect, test } from 'bun:test';
import { readLines, sum } from '../../utils';

const input = await readLines('input.txt', import.meta);
const ex1 = await readLines('ex1.txt', import.meta);
const ex2 = await readLines('ex2.txt', import.meta);

test('1.1', () => {
  expect(ex1.map(getValue).reduce(sum)).toBe(142);
  expect(input.map(getValue).reduce(sum)).toBe(52974);
});

test('1.2', () => {
  expect(ex2.map(getFixedValue).reduce(sum)).toBe(281);
  expect(input.map(getFixedValue).reduce(sum)).toBe(53340);
});

function getValue(s: string) {
  const first = /\d/.exec(s)![0];
  const last = /.*(\d)/.exec(s)![1];
  return Number(first + last);
}

function getFixedValue(s: string) {
  const first = /one|two|three|four|five|six|seven|eight|nine|\d/.exec(s)![0];
  const last = /.*(one|two|three|four|five|six|seven|eight|nine|\d)/.exec(s)![1];
  return Number(fix(first) + fix(last));
}

function fix(m: string) {
  if (m === 'one') return '1';
  if (m === 'two') return '2';
  if (m === 'three') return '3';
  if (m === 'four') return '4';
  if (m === 'five') return '5';
  if (m === 'six') return '6';
  if (m === 'seven') return '7';
  if (m === 'eight') return '8';
  if (m === 'nine') return '9';
  return m;
}
