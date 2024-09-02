export function filterByKeys<T>(
  object: { [key: string]: any } & T,
  key: (keyof T)[]
): T {
  const json = key.reduce(
    (prev, cur) => ({
      ...prev,
      [cur]: object[cur],
    }),
    {}
  ) as T;

  return json;
}