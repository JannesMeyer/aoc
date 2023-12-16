import { expect, test } from 'bun:test';
import { chunks, doubleLineBreak, lineBreak, parseInts, read } from '../../utils';

type Range = [number, number];
const ex1 = await read('ex1.txt', import.meta);
const input = await read('input.txt', import.meta);

test('5.2', () => {
  expect(Math.min(...part2(ex1).map((x) => Math.min(...x)))).toBe(46);
  // expect(part2(input).map(x => Math.min(...x))).toBe(57451709);
});

function part2(input: string) {
  const [seeds, ...groups] = input.split(doubleLineBreak);
  let ranges = chunks(parseInts(seeds), 2).map(([a, b]): Range => [a, a + b - 1]);

  for (const mapsBlock of groups) {
    const images: Range[] = [];
    while (ranges.length) {
      const [x, y] = ranges.pop()!;
      for (const [a, b, delta] of mapsBlock.split(lineBreak).slice(1).map(parseInts)) {
        const rEndpoint = b + delta - 1;
        if (b <= x && x <= y && y <= rEndpoint) {
          images.push([x - b + a, y - b + a]);
          break;
        }
        if (b <= x && x <= rEndpoint && rEndpoint < y) {
          ranges.push([x, rEndpoint], [rEndpoint + 1, y]);
          break;
        }
      }
      images.push([x, y]);
    }
    ranges = images;
  }
  return ranges;
}

// for (const group of groups) {
//   const translated: Range[] = [];
//   for (const [destStart, sourceStart, length] of group.split(lineBreak).slice(1).map(parseInts)) {
//     const sourceRange: Range = [sourceStart, sourceStart + length - 1];
//     ranges = ranges.flatMap((r) => {
//       if (notTouching(r, sourceRange)) {
//         return [r];
//       }
//       const [a1, a2] = r;
//       const [b1, b2] = sourceRange;
//       translated.push([Math.max(a1, b1) - sourceStart + destStart, Math.min(a2, b2) - sourceStart + destStart]);
//       return [[a1, b1] as Range, [b2, a2] as Range].filter((r) => r[0] < r[1]);
//     });
//   }
//   ranges.push(...translated);
// }
// return Math.min(...ranges.map((r) => r[0]));

function notTouching([a1, a2]: Range, [b1, b2]: Range) {
  return a2 < b1 || b2 < a1;
}
