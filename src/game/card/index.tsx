import React from "react";

import "./card.css";

export default function Card({ card }: { card: string }) {
  return (
    <div className="card">
      <div className="cardText">{card}</div>
    </div>
  );
}
