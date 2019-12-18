import React from "react";

export default function({ message }: { message: string }) {
  return <p>Error Fetching: {message}</p>;
}
