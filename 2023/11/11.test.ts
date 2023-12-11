import { expect, test } from 'bun:test';
import { isDefined, readLines, sum } from '../../utils';

const ex1 = await readLines('ex1.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('11.1', () => {
  expect(calculate(ex1, 2)).toBe(374);
  expect(calculate(input, 2)).toBe(9686930);
});

test('11.2', () => {
  expect(calculate(ex1, 10)).toBe(1030);
  expect(calculate(input, 1_000_000)).toBe(630728425490);
});

function calculate(input: string[], expansion: number) {
  const galaxies = loadGalaxies(input);
  expandUniverse(galaxies, g => g.x, g => g.x += -1 + expansion);
  expandUniverse(galaxies, g => g.y, g => g.y += -1 + expansion);
  return combinationsWithoutRepeating(galaxies).map(([a, b]) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)).reduce(sum);
}

function expandUniverse<T>(objects: T[], get: (o: T) => number, update: (o: T) => void) {
  const values = new Set(objects.map(get));
  Array.from({ length: Math.max(...values) }).flatMap((_, i) => values.has(i) ? [] : objects.filter(o => i < get(o))).forEach(update);
}

function loadGalaxies(input: string[]) {
  return input.flatMap((line, y) => Array.from(line, (c, x) => c === '#' ? { x, y } : undefined).filter(isDefined));
}

function combinationsWithoutRepeating<T>(elements: T[]) {
  return elements.flatMap((a, i) => elements.slice(i + 1).map(b => [a, b]));
}
