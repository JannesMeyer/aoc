import { asInteger, equal, readLines } from '../utils.ts';

type Range = [number, number];

const lines = await readLines('input.txt', import.meta.url);
const ranges = lines.map((line) => line.split(',').map((x) => x.split('-').map(asInteger)) as [Range, Range]);

Deno.test('4.1', () => {
  equal(ranges.filter(([a, b]) => isSubset(a, b) || isSubset(b, a)).length, 433);
});

Deno.test('4.2', () => {
  equal(ranges.filter(([a, b]) => a[1] >= b[0] && a[0] <= b[1]).length, 852);
});

function isSubset(sub: Range, supr: Range) {
  return sub[0] >= supr[0] && sub[1] <= supr[1];
}
