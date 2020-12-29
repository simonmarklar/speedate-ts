import React from "react";

type RequiresChildren<P = {}> = NonNullable<React.PropsWithChildren<P>>;

export default function Maybe({
  value,
  not,
  children,
}: RequiresChildren<{ value: boolean; not?: React.ReactNode }>) {
  if (!value || !children) {
    return not != null ? <>{not}</> : null;
  }
  return <>{children}</>;
}
