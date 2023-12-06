import { expect, test } from 'bun:test';
import { chunks, doubleLineBreak, lineBreak, parseInts, range, read } from '../../utils';

const ex1 = await read('ex1.txt', import.meta);
const input = await read('input.txt', import.meta);

test('5.1', () => {
  expect(part1(ex1)).toBe(35);
  expect(part1(input)).toBe(551761867);
});

// test('5.2', () => {
//   // expect(part2(ex1)).toBe(46);
//   // expect(part2(input)).toBe(46);
// });

function part1(input: string) {
  const [a, ...rest] = input.split(doubleLineBreak);
  const convert = getConverter(rest);
  return Math.min(...parseInts(a).map(convert));
}

function getConverter(groups: string[]) {
  return groups.map((g) =>
    g.split(lineBreak).slice(1).map(parseInts).reduce(
      (f, [dest, source, length]) => (n) => (n >= source && n < source + length) ? dest + (n - source) : f(n),
      (n: number) => n,
    )
  ).reduce((a, b) => (n: number) => b(a(n)));
}

function part2(input: string) {
  const [seeds, ...rest] = input.split(doubleLineBreak);
  const convert = getConverter(rest);
  const chunkies = chunks(parseInts(seeds), 2);
  let smallest = Infinity;
  for (const [j, [start, length]] of chunkies.entries()) {
    console.log(`part ${j + 1} of ${chunkies.length}`);
    for (let i = start; i < start + length; i++) {
      const result = convert(i);
      if (result < smallest) {
        smallest = result;
      }
      // console.log(i, ((i - start) / length * 100).toFixed(1) + '%')
    }
  }
  return smallest;
}
