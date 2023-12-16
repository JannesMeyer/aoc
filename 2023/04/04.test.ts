import { expect, test } from 'bun:test';
import { parseInts, readLines, sum } from '../../utils';

type Card = { id: number; wins: number };

const ex1 = await readLines('ex1.txt', import.meta).then((l) => l.map(parseCard));
const input = await readLines('input.txt', import.meta).then((l) => l.map(parseCard));

test('4.1', () => {
  expect(ex1.map(getPoints).reduce(sum)).toBe(13);
  expect(input.map(getPoints).reduce(sum)).toBe(28750);
});

test('4.2', () => {
  expect(countCopies(ex1)).toBe(30);
  expect(countCopies(input)).toBe(10212704);
});

function getPoints({ wins: n }: Card) {
  return n ? 2 ** (n - 1) : 0;
}

function countCopies(cards: Card[], start = 0, count = cards.length): number {
  let sum = count;
  for (let i = start; i < start + count; ++i) {
    const { id, wins } = cards[i];
    sum += wins ? countCopies(cards, id, wins) : 0;
  }
  return sum;
}

function countCopiesFn(cards: Card[], start = 0, count = cards.length): number {
  return count + cards.slice(start, start + count).map(({ id, wins }) => (wins ? countCopiesFn(cards, id, wins) : 0)).reduce(sum);
}

function countCopiesQueue(cards: Card[]): number {
  const queue = cards.slice();
  let sum = 0;
  // eslint-disable-next-line no-cond-assign
  for (let card: Card | undefined; card = queue.pop(); ++sum) {
    for (let i = 0; i < card.wins; ++i) {
      queue.push(cards[card.id + i]);
    }
  }
  return sum;
}

function parseCard(card: string, index: number): Card {
  const [winning, numbers] = card.split(':')[1].split('|').map(parseInts);
  return { id: index + 1, wins: numbers.filter((n) => winning.includes(n)).length };
}
