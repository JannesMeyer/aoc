import { asInteger, equal, readLines } from '../utils.ts';

const input = await readLines('input.txt', import.meta.url);

Deno.test('8.1', () => {
  equal(countVisibleTrees(['30373', '25512', '65332', '33549', '35390']), 21);
  equal(countVisibleTrees(input), 1816);
});

function countVisibleTrees(lines: string[]) {
  const map = lines.map((l) => Array.prototype.slice.call(l).map(asInteger));
  const visible = new Set<string>();
  function check(x: number, y: number, tallest: number | undefined) {
    const current = map[y][x];
    if (tallest == null || tallest < current) {
      visible.add(`${x}-${y}`);
      return current;
    }
    return tallest;
  }

  const ys = [...Array(map.length).keys()];
  const xs = [...Array(map[0].length).keys()];
  const ysInv = ys.toReversed();
  const xsInv = xs.toReversed();
  for (const y of ys) {
    xs.reduce((tallest: number | undefined, x) => check(x, y, tallest), undefined);
    xsInv.reduce((tallest: number | undefined, x) => check(x, y, tallest), undefined);
  }
  for (const x of xs) {
    ys.reduce((tallest: number | undefined, y) => check(x, y, tallest), undefined);
    ysInv.reduce((tallest: number | undefined, y) => check(x, y, tallest), undefined);
  }
  return visible.size;
}
