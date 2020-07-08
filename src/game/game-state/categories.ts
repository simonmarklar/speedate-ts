export const take = (amount: number) =>
  function* <T>(source: IterableIterator<T>): Generator<T, void, void> {
    for (const item of source) {
      if (--amount < 0) {
        return;
      }

      yield item;
    }
  };

export const concat = function* <T>(
  iterable: IterableIterator<T> | Iterable<T>
): Generator<T[], void, void> {
  const combined = [];
  for (const item of iterable) {
    combined.push(item);
  }

  yield combined;
};

export const pluckRandomIndex = function* <T>(
  arr: T[]
): Generator<T, void, void> {
  if (!Array.isArray(arr)) {
    throw new Error("Cannot pick from a non-array iterable");
  }
  const index = Math.floor(Math.random() * (arr.length + 1));
  while (arr.length) {
    const value = arr.splice(index, 1);
    if (value.length === 1) yield value[0];
  }
};

export const shuffle = function* <T>(
  iterable: IterableIterator<T>
): Generator<T, void, void> {
  for (const sourceGroup of concat(iterable)) {
    yield* pluckRandomIndex(sourceGroup);
  }
};

// utility
export const logValue = function* <T>(
  iterable: IterableIterator<T>
): Generator<T, void, void> {
  for (const value of iterable) {
    console.log(value);
    yield value;
  }
};

export const all = <T>(...consumers: Array<(arg0: T) => T>) =>
  function* (dataSource: IterableIterator<T>): Generator<T[], any, any> {
    for (const item of dataSource) {
      const result = []
      for (const consumer of consumers) {
        result.push(consumer(item))
      }

      yield result
    }
  };

export const chain = (...args: Array<GeneratorFunctionConstructor>) =>
  //   ...args: Array<(arg0: IterableIterator<any>) => Generator<any, any, any>>
  function <T>(initialIterator: T): T {
    return args.reduce((result, iter) => {
      return iter(result);
    }, initialIterator as any);
  };
