import React, { useMemo } from "react";
import _ from "lodash";
import "./style.css";

const Girl = ({ dateNumber }: { dateNumber: number }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const imgUrl = useMemo(() => `/assets/img/girls/girl${_.random(0, 9)}.png`, [
    dateNumber
  ]);
  return <img src={imgUrl} alt="Your date" className="girl" />;
};

export default Girl;
