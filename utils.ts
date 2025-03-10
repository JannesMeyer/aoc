import { readFile } from 'node:fs/promises';

export const lineBreak = /\r?\n/;
export const doubleLineBreak = /\r?\n\r?\n/;

export function read(path: string, meta: ImportMeta) {
  return readFile(new URL(path, meta.url), 'utf8');
}

export async function readLines(path: string, meta: ImportMeta) {
  return (await read(path, meta)).split(lineBreak);
}

export function sum(a: number, b: number) {
  return a + b;
}

export function multiply(a: number, b: number) {
  return a * b;
}

export function throwError(error: unknown = new Error()): never {
  if (typeof error === 'string') {
    error = new Error(error);
  }
  throw error;
}

export function intersection<T>(...iterables: Iterable<T>[]): T[] {
  const [first, ...rest] = iterables.map(asSet);
  return Array.from(first).filter((x) => rest.every((s) => s.has(x)));
}

function asSet<T>(a: Iterable<T>): Set<T> {
  return a instanceof Set ? a : new Set(a);
}

export function chunks<S extends readonly unknown[] | string>(sequence: S, size: number): S[] {
  const length = Math.ceil(sequence.length / size);
  return Array.from({ length }, (_, i) => sequence.slice(i * size, (i + 1) * size) as S);
}

export function single<T>(array: readonly T[]): T {
  if (array.length !== 1) {
    throw new Error('Not a single item');
  }
  return array[0];
}

export function parseInts(str: string | undefined): number[] {
  return str?.match(/-?\d+/g)?.map((x) => Number.parseInt(x, 10)) ?? [];
}

export function isDefined<T>(value: T): value is NonNullable<T> {
  return value != null;
}

/** Like Python's range() generator */
export function* range(start: number, stop: number, step = stop < start ? -1 : 1) {
  while ((step < 0 && stop < start) || (step > 0 && stop > start)) {
    yield start;
    start += step;
  }
}
