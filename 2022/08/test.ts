import { asInteger, equal, readLines, throwError } from '../utils.ts';

type Trees = number[][];

const input = await readLines('input.txt', import.meta.url);
const load = (input: string[]): Trees => input.map((str) => Array.from(str, asInteger));

Deno.test('8.1', () => {
  equal(countVisibleTrees(load(['30373', '25512', '65332', '33549', '35390'])), 21);
  equal(countVisibleTrees(load(input)), 1816);
});

Deno.test('8.2', () => {
  equal(getMaxScenicScore(load(['30373', '25512', '65332', '33549', '35390'])), 8);
  equal(getMaxScenicScore(load(input)), 383520);
});

function countVisibleTrees(map: Trees) {
  const visible = new Set<string>();
  const height = map.length;
  const width = map[0].length;
  const ys = Array.from({ length: height }, (_, i) => i);
  const xs = Array.from({ length: width }, (_, i) => i);
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

  function check(x: number, y: number, tallest: number | undefined) {
    const current = map[y][x];
    if (tallest == null || tallest < current) {
      visible.add(`${x}-${y}`);
      return current;
    }
    return tallest;
  }
}

function getMaxScenicScore(map: Trees): number {
  const height = map.length;
  const width = map[0].length;
  return Math.max(...Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => getScenicScore(map, x, y))).flat());
}

function getScenicScore(trees: Trees, x: number, y: number) {
  return getViewDistance(trees, x, y, 0, -1) *
    getViewDistance(trees, x, y, -1, 0) *
    getViewDistance(trees, x, y, 0, 1) *
    getViewDistance(trees, x, y, 1, 0);
}

function getViewDistance(map: Trees, x: number, y: number, dx: number, dy: number): number {
  const trees = walk(map, x, y, dx, dy);
  const start = trees.next().value ?? throwError();
  let distance = 0;
  for (const value of trees) {
    distance++;
    if (value >= start) break;
  }
  return distance;
}

function* walk<T>(map: T[][], x: number, y: number, dx: number, dy: number) {
  while (true) {
    const p = map[y]?.[x];
    if (p == null) return;
    yield p;
    x += dx;
    y += dy;
  }
}
