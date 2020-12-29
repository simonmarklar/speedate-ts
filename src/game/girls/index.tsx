import React, { useMemo } from "react";
import { random } from "lodash";

import styled from "styled-components";

const GirlContainer = styled.div<{
  $imageUrl: string;
}>`
  background-image: url(${(props) => props.$imageUrl});
  width: 363px;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 372px;
`;
 
export default function Girl({
  dateNumber,
}: {
  dateNumber: number;
}) {
  
  const imgUrl = useMemo(() => `/assets/img/girls/girl${random(dateNumber, 9)}.png`, [
    dateNumber,
  ]);

  return <GirlContainer $imageUrl={imgUrl} />;
}
