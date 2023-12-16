import { expect, test } from 'bun:test';
import { isDefined, parseInts, readLines, sum } from '../../utils';

const ex1 = await readLines('ex1.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('12.1', () => {
  expect(part1(ex1)).toBe(21);
  expect(part1(input)).toBe(7221);
});

function part1(input: string[]) {
  let totalSum = 0;
  for (const line of input) {
    const [springs, checksum] = line.split(' ');
    const total = parseInts(checksum).reduce(sum);
    // console.log(springs, checksum, total);
    const indices = Array.from(springs, (c, i) => c === '?' ? i : undefined).filter(isDefined);
    for (const perm of permutations(['#', '.'], indices.length)) {
      const springsCopy = Array.from(springs);
      for (let i = 0; i < indices.length; i++) {
        springsCopy[indices[i]] = perm[i];
      }
      if (springsCopy.filter(x => x === '#').length !== total) {
        continue;
      }
      if (getChecksum(springsCopy) === checksum) {
        totalSum++;
      }
    }
  }
  return totalSum;
}

function* permutations<T>(values: T[], repeat: number, out: T[] = []): Generator<T[]> {
  for (const v of values) {
    if (out.push(v) === repeat) {
      yield out.slice();
    } else {
      yield* permutations(values, repeat, out);
    }
    out.pop();
  }
}

function getChecksum(springs: string[]) {
  return springs.join('').split(/\.+/).map(s => s.length).filter(Boolean).join(',');
}
