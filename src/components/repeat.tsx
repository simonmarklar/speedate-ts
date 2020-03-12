import React, { ReactNode } from "react";

export default function Repeat<T>(props: {
  list: T[];
  children: (arg0: T, arg1: any) => ReactNode;
}) {
  const { list, children } = props;
  const items = list.map(children);

  return <>{items}</>;
}
