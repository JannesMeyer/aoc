import { assert, doubleLineBreak, equal, getInts, isNotEmpty, lineBreak, read, toRecord } from '../utils.ts';

const input = (await read('input.txt', import.meta.url)).split(doubleLineBreak);
const moves = input[1].split(lineBreak).map(getInts);

Deno.test('5.1', () => {
  const stacks = getStacks(input[0]);
  for (const [qty, from, to] of moves) {
    const crates = stacks[from].splice(-qty).reverse();
    assert(crates.length > 0);
    stacks[to].push(...crates);
  }
  equal(top(stacks), 'SPFMVDTZT');
});

Deno.test('5.2', () => {
  const stacks = getStacks(input[0]);
  for (const [qty, from, to] of moves) {
    const crates = stacks[from].splice(-qty);
    assert(crates.length > 0);
    stacks[to].push(...crates);
  }
  equal(top(stacks), 'ZFSJBPRFP');
});

function getStacks(text: string) {
  const lines = text.split(lineBreak).reverse();
  return toRecord(getInts(lines.shift()), (k) => k, (_, i) => lines.map((r) => r[i * 4 + 1]).filter(isNotEmpty));
}

function top(stacks: ReturnType<typeof getStacks>): string {
  return Array.from(Object.values(stacks), (s) => s[s.length - 1]).join('');
}
