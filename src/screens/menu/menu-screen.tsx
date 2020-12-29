import React from "react";
import styled from "styled-components";

import Menu from "./menu";

import logo from "./logo.png";

const Screen = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-content: center;
`;

Header.displayName = "Header";

const HeaderItem = styled.div`
  flex: 0 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
HeaderItem.displayName = "HeaderItem";

const HeaderText = styled(HeaderItem)`
  text-align: center;
  padding: 0 2em;
`;
HeaderText.displayName = "HeaderText";

const Logo = styled.h1`
  background: url(${logo}) no-repeat 50%;
  width: 100%;
  height: 200px;
  text-indent: -999em;
  display: block;
`;

Logo.displayName = "Logo";

export default function MenuScreen() {
  return (
    <Screen>
      <Header>
        <HeaderItem>
          <Logo>Speedate!</Logo>
        </HeaderItem>
        <HeaderText>
          <p>Douchey McDouchebag needs some lovin'</p>
          <p>Nothing like a bit of speed dating to get your heart pumping!</p>

          <p>
            Try and make your dates heart race by figuring out what she loves
            and hates.
          </p>

          <p>
            The girls gradually reveal their interests. Discard the bad cards
            and keep the good ones to make a perfect hand and win them over!
          </p>
        </HeaderText>
      </Header>
      <Menu />
    </Screen>
  );
}
