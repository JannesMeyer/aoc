import { expect, test } from 'bun:test';
import { getInts, readLines, sum } from '../utils';

const input = await readLines('input.txt', import.meta);

test('7.1', () => {
  expect(Array.from(Object.values(collectSizes(input))).filter((x) => x <= 100000).reduce(sum)).toEqual(1477771);
});

test('7.2', () => {
  const sizes = collectSizes(input);
  const toDelete = 30000000 - (70000000 - sizes['/']);
  expect(Math.min(...Array.from(Object.values(sizes)).filter((x) => x >= toDelete))).toEqual(3579501);
});

function collectSizes(lines: string[]) {
  let currentDir: string[] = [];
  const sizes: Record<string, number> = {};
  for (const line of lines) {
    if (line.startsWith('$ cd')) {
      const arg = line.slice(5);
      if (arg.startsWith('/')) {
        currentDir = [];
      } else if (arg === '..') {
        currentDir.pop();
      } else {
        currentDir.push(arg);
      }
      continue;
    }
    if (line.startsWith('$ ls')) {
      continue;
    }
    const size = getInts(line)[0];
    if (size == null) {
      continue;
    }
    for (let i = 0; i <= currentDir.length; ++i) {
      const path = '/' + currentDir.slice(0, i).join('/');
      sizes[path] = (sizes[path] ?? 0) + size;
    }
  }
  return sizes;
}
