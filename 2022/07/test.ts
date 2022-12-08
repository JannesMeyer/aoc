import { equal, getInts, readLines, sum } from '../utils.ts';

const input = await readLines('input.txt', import.meta.url);

Deno.test('7.1', () => {
  equal(Array.from(Object.values(collectSizes(input))).filter((x) => x <= 100000).reduce(sum), 1477771);
});

Deno.test('7.2', () => {
  const sizes = collectSizes(input);
  const toDelete = 30000000 - (70000000 - sizes['/']);
  equal(Math.min(...Array.from(Object.values(sizes)).filter((x) => x >= toDelete)), 3579501);
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
