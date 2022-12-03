export const lineBreak = /\r?\n/;
export const doubleLineBreak = /\r?\n\r?\n/;

export function read(path: string, baseUrl?: string) {
  return Deno.readTextFile(baseUrl ? new URL(path, baseUrl) : path);
}

export async function readLines(path: string, baseUrl?: string) {
  return (await read(path, baseUrl)).split(lineBreak);
}

export function asInteger(a: string | number) {
  if (typeof a === 'number') {
    return a;
  }
  const n = Number.parseInt(a, 10);
  if (Number.isNaN(n)) {
    throw new Error(`NaN: ${a}`);
  }
  return n;
}

export function sum(a: number, b: number) {
  return a + b;
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

export function chunks<S extends unknown[] | string>(sequence: S, size: number): S[] {
  const length = Math.ceil(sequence.length / size);
  return Array.from({ length }, (_, i) => sequence.slice(i * size, (i + 1) * size) as S);
}

export function single<T>(a: T[]): T {
  if (a.length !== 1) {
    throw new Error('Not a single item');
  }
  return a[0];
}

export function equal<T>(a: T, b: T): T {
  if (a !== b) {
    throw new Error(`${a} does not equal ${b}`);
  }
  return a;
}
