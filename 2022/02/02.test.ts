import { expect, test } from 'bun:test';
import { readLines, sum } from '../utils';

const lines = await readLines('input.txt', import.meta);

test('2.1', () => {
  const scores = lines.map((line) => line.split(' ')).map(([a, b]) => {
    const opp = moveByInput[a];
    const you = moveByInput[b];
    return you + 1 + getScore(opp, you);
  });
  expect(scores.reduce(sum)).toEqual(10595);
});

test('2.2', () => {
  const scores = lines.map((line) => line.split(' ')).map(([a, b]) => {
    const opp = moveByInput[a];
    const you = (moves.length + opp + deltaByInput[b]) % moves.length;
    return you + 1 + getScore(opp, you);
  });
  expect(scores.reduce(sum)).toEqual(9541);
});

const moves = ['rock', 'paper', 'scissors'];
const moveByInput: Record<string, number> = {
  A: 0,
  B: 1,
  C: 2,
  X: 0,
  Y: 1,
  Z: 2,
};
const deltaByInput: Record<string, number> = {
  X: -1,
  Y: 0,
  Z: 1,
};

function getScore(opp: number, you: number) {
  if (opp === you) {
    return 3;
  }
  return (opp + 1) % moves.length === you ? 6 : 0;
}
