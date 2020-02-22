import React, { ReactNode } from "react";

type Props<T> = {
  list: T[];
  children: (arg0: T, arg1?: any) => ReactNode;
};

export default function Repeat<T>(props: Props<T>) {
  const { list, children } = props;
  const items = list.map(children);

  return <>{items}</>;
}
