import React, { MouseEventHandler, PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

const DifficultyButton = styled(animated.div)`
  text-decoration: none;
  text-align: center;
  display: block;
  position: relative;
`;

const DifficultyName = styled.h2`
  text-align: center;
  font-size: 3rem;
`;

const DifficultyDescription = styled(animated.p)`
  background: white;
`;

export default function MenuButton({
  title,
  description,
  children,
  onClick
}: PropsWithChildren<{
  title: string;
  description: string;
  onClick: MouseEventHandler;
}>) {
  const [isHover, setIsHover] = useState(false);
  const { opacity, transform } = useSpring({
    from: { opacity: 0, transform: "scale(1)" },
    opacity: isHover ? 1 : 0,
    transform: isHover ? "scale(1.1)" : "scale(1)"
  });

  return (
    <DifficultyButton
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ transform }}
    >
      <DifficultyName>{title}</DifficultyName>
      {children}
      <DifficultyDescription style={{ opacity }}>
        {description}
      </DifficultyDescription>
    </DifficultyButton>
  );
}
