import React from "react";
import styled from "styled-components";
import { Card } from "../../config";

const GuyContainer = styled.div<{
  $imageUrl: string;
}>`
  background-image: url(${(props) => props.$imageUrl});
  width: 200px;
  height: 246px;
  position: absolute;
  bottom: 0;
  transform: scale(1.4);
  transform-origin: center;
`;

export default function Guy({
  imageUrl,
}: {
  imageUrl: string;
  currentCards?: Card[];
}) {
  return <GuyContainer $imageUrl={imageUrl}></GuyContainer>;
}
