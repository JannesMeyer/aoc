import { test } from 'bun:test';
import { readLines } from '../../utils';

const ex1 = await readLines('ex1.txt', import.meta);

test('', () => {
  part1(ex1);
});

function part1(input: string[]) {
}
