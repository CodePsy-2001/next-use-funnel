export type ISteps = [string, ...string[]] | readonly [string, ...string[]];
export type IState = Record<string, unknown>;

export type Action<T> = T | ((prev: T) => T);

export const toArray = <T>(value: T | T[]) => (Array.isArray(value) ? value : [value]);
