import { expect, test } from 'bun:test';
import { parseInts, readLines, sum, throwError } from '../../utils';

const ex1 = await readLines('ex1.txt', import.meta);
const input = await readLines('input.txt', import.meta);

test('9.1', () => {
  expect(ex1.map(parseInts).map(predict).reduce(sum)).toBe(114);
  expect(input.map(parseInts).map(predict).reduce(sum)).toBe(2008960228);
});

test('9.2', () => {
  expect(ex1.map(parseInts).map((s) => predict(s.reverse())).reduce(sum)).toBe(2);
  expect(input.map(parseInts).map((s) => predict(s.reverse())).reduce(sum)).toBe(1097);
});

function predict(series: number[]) {
  let res = 0;
  while (series.some((x) => x !== 0)) {
    res += series.at(-1) ?? throwError();
    series = series.slice(1).map((n, i) => n - series[i]);
  }
  return res;
}
