import { expect, test } from 'bun:test';
import { read } from '../../utils';

const input = await read('input.txt', import.meta);

test('6.1', () => {
  expect(getMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toEqual(5);
  expect(getMarker('nppdvjthqldpwncqszvftbrmjlhg', 4)).toEqual(6);
  expect(getMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toEqual(10);
  expect(getMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toEqual(11);
  expect(getMarker(input, 4)).toEqual(1920);
});

test('6.2', () => {
  expect(getMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toEqual(19);
  expect(getMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toEqual(23);
  expect(getMarker('nppdvjthqldpwncqszvftbrmjlhg', 14)).toEqual(23);
  expect(getMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toEqual(29);
  expect(getMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toEqual(26);
  expect(getMarker(input, 14)).toEqual(2334);
});

function getMarker(text: string, distinctChars: number) {
  for (let i = distinctChars; i < text.length; ++i) {
    if (new Set(Array.prototype.slice.call(text, i - distinctChars, i)).size === distinctChars) {
      return i;
    }
  }
}
