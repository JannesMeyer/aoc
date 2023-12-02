import { expect, test } from 'bun:test';
import { asInteger, readLines } from '../../utils';

type Range = [number, number];

const lines = await readLines('input.txt', import.meta);
const ranges = lines.map((line) => line.split(',').map((x) => x.split('-').map(asInteger)) as [Range, Range]);

test('4.1', () => {
  expect(ranges.filter(([a, b]) => isSubset(a, b) || isSubset(b, a)).length).toEqual(433);
});

test('4.2', () => {
  expect(ranges.filter(([a, b]) => a[1] >= b[0] && a[0] <= b[1]).length).toEqual(852);
});

function isSubset(sub: Range, supr: Range) {
  return sub[0] >= supr[0] && sub[1] <= supr[1];
}
