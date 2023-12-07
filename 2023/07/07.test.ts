import { expect, test } from 'bun:test';
import { readLines, sum } from '../../utils';

const ex1 = await readLines('ex1.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('7.1', () => {
  expect(calculate(ex1, false)).toBe(6440);
  expect(calculate(input, false)).toBe(250254244);
});

test('7.2', () => {
  expect(calculate(ex1, true)).toBe(5905);
  expect(calculate(input, true)).toBe(250087440);
});

const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const cardValuesJoker = cardValues.filter((c) => c !== 'J');

function calculate(input: string[], joker: boolean) {
  return input.map((l) => l.split(' ')).map(([cardsRaw, bet]) => {
    const cards = Array.from(cardsRaw, (c) => (joker ? cardValuesJoker : cardValues).indexOf(c));
    return { cards, type: (joker ? getHandTypeJoker : getHandType)(cards), bet: Number(bet) };
  }).sort((a, b) => compare(a.type, b.type) || compare(a.cards, b.cards)).map(({ bet }, i) => (i + 1) * bet).reduce(sum);
}

function getHandType(cards: number[]) {
  return Array.from(new Set(cards), (x) => cards.filter((c) => c === x).length).sort((a, b) => b - a);
}

function getHandTypeJoker(cards: number[]) {
  return cardValuesJoker.map((_, i) => getHandType(cards.map((c) => c < 0 ? i : c))).sort((a, b) => compare(a, b)).at(-1)!;
}

function compare(a: number[], b: number[]) {
  return a.length !== b.length ? b.length - a.length : a.reduce((acc, a, i) => acc || a - b[i], 0);
}
