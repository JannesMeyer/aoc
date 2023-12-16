import { expect, test } from 'bun:test';
import { readLines, throwError } from '../../utils';

type Node = { x: number; y: number; nodes: (() => Node | undefined)[] };

const ex1 = await readLines('ex1.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('10.1', () => {
  expect(findLoop(loadMap(ex1)).length / 2).toBe(8);
  expect(findLoop(loadMap(input)).length / 2).toBe(6846);
});

test('10.2', () => {
  const loop = findLoop(loadMap(input));
  const xs = loop.map(n => n.x);
  const ys = loop.map(n => n.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const inside = loop.filter(n => isInsidePolygon(loop, n));
  expect(inside.length).toBe(6846);
});

function findLoop(start: Node) {
  let path = [start];
  while (true) {
    const last = path.length - 1;
    const node = path[last].nodes.map(n => n()).find(n => n !== path[last - 1]) ?? throwError();
    if (node === start) return path;
    path.push(node);
  }
}

function isInsidePolygon(polygon: Node[], point: Node) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pi = polygon[i];
    const pj = polygon[j];
    if (
      pi.y > point.y !== pj.y > point.y
      && point.x < (pj.x - pi.x) * (point.y - pi.y) / (pj.y - pi.y) + pi.x
    ) {
      inside = !inside;
    }
  }
  return inside;
}

/** Alternative solution using depth-first search */
function findLoopDFS(start: Node) {
  const stack = [[start]];
  let path: Node[] | undefined;
  // eslint-disable-next-line no-cond-assign
  while (path = stack.pop()) {
    for (const getNode of path.at(-1)!.nodes) {
      const node = getNode();
      if (!node || node === path.at(-2)) continue;
      if (node === start) return path;
      stack.push(path.concat(node));
    }
  }
}

function loadMap(input: string[]) {
  let start: Node | undefined;
  const map = input.map((row, y) =>
    Array.from(row, (c, x): Node | undefined => {
      const north = () => map[y - 1]?.[x];
      const south = () => map[y + 1]?.[x];
      const west = () => map[y][x - 1];
      const east = () => map[y][x + 1];
      if (c === 'S') return start = { x, y, nodes: [north, south, west, east] };
      if (c === '|') return { x, y, nodes: [north, south] };
      if (c === '-') return { x, y, nodes: [west, east] };
      if (c === 'L') return { x, y, nodes: [north, east] };
      if (c === 'J') return { x, y, nodes: [north, west] };
      if (c === '7') return { x, y, nodes: [south, west] };
      if (c === 'F') return { x, y, nodes: [south, east] };
    })
  );
  if (!start) throw new Error('No start found');
  start.nodes = start.nodes.filter(n => n()?.nodes.find(rn => rn() === start));
  return start;
}
