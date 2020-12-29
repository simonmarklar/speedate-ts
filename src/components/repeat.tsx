import React, { ReactNode } from "react";

export default function Repeat<T>({ list, children }: {
  list: Iterable<T> | ArrayLike<T>;
  children: (value: T, index: number, array: T[]) => ReactNode;
}) {
  const data = Array.from(list)
  if (!data.length) {
    return null
  }
  return <>{data.map(children)}</>;
}
