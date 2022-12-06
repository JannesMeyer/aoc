import { equal, read } from '../utils.ts';

const input = await read('input.txt', import.meta.url);

Deno.test('6.1', () => {
  equal(getMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4), 5);
  equal(getMarker('nppdvjthqldpwncqszvftbrmjlhg', 4), 6);
  equal(getMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4), 10);
  equal(getMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4), 11);
  equal(getMarker(input, 4), 1920);
});

Deno.test('6.2', () => {
  equal(getMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14), 19);
  equal(getMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14), 23);
  equal(getMarker('nppdvjthqldpwncqszvftbrmjlhg', 14), 23);
  equal(getMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14), 29);
  equal(getMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14), 26);
  equal(getMarker(input, 14), 2334);
});

function getMarker(text: string, distinctChars: number) {
  for (let i = distinctChars; i < text.length; ++i) {
    if (new Set(Array.prototype.slice.call(text, i - distinctChars, i)).size === distinctChars) {
      return i;
    }
  }
}
