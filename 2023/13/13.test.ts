import { test } from 'bun:test';
import { doubleLineBreak, lineBreak, read, readLines } from '../../utils';

const ex1 = await read('ex1.txt', import.meta);

test('', () => {
  part1(ex1);
});

function part1(input: string) {
  const maps = input.split(doubleLineBreak).map(m => m.split(lineBreak).map(l => Array.from(l, c => c === '#' ? true : undefined)));
  console.log(findSymmetricAxis(maps[0]));
  print(maps[0]);
}

type Map = (boolean | undefined)[][];

function print(map: Map) {
  for (const line of map) {
    console.log(line.map(x => x ? '▓' : ' ').join(''));
  }
}

function findSymmetricAxis(map: Map) {
}

function isEqual(map: Map, a: number, b: number) {
  for (let i = 0; i < map.length; i++) {
    if (map[a][i] !== map[b][i]) {
      return false;
    }
  }
}
