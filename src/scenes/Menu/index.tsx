import styled from 'styled-components'

import logo from './logo.png'
import * as config from '../../config'

import MenuButton from './MenuButton'
import Player from '../../characters/guys'
import { AnimatePresence, motion, Variants } from 'framer-motion'

import { useDispatch } from '../../hooks/useGameState'
import useRemoveComponentIfSafe from '../../hooks/useRemoveComponentIfSafe'

const Header = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-content: center;
`
Header.displayName = 'Header'

const HeaderItem = styled.div`
  flex: 0 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Logo = styled.h1`
  background: url(${logo}) no-repeat 50%;
  width: 100%;
  height: 200px;
  text-indent: -999em;
  display: block;
`
Logo.displayName = 'Logo'

const Text = styled.div`
  text-align: center;
  padding: 0 2em;
`

const ButtonList = motion(styled.ul`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`)
ButtonList.displayName = 'ButtonList'

const ListItem = motion(styled.li`
  list-style: none;
  max-width: 33%;
  /* flex: 0 1 25%;
  flex-direction: column;
  justify-content: center;
  display: flex; */
`)
ListItem.displayName = 'ListItem'

const buttons: Variants = {
  initial: {
    x: '100vh',
    opacity: 0,
  },
  enter: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      ease: 'anticipate',
      duration: 1.25,
      staggerChildren: 0.4,
    },
  }),
  exit: (i) => ({
    x: (i + 1) * 100 * 4 + '%',
    opacity: 0,
    transition: {
      ease: 'linear',
      duration: 0.4,
      staggerChildren: 0.1,
    },
  }),
}

export default function MenuScreen() {
  const dispatch = useDispatch()

  useRemoveComponentIfSafe()

  return (
    <>
      <Header>
        <HeaderItem>
          <Logo>Speedate!</Logo>
        </HeaderItem>
        <HeaderItem>
          <Text>
            <p>Douchey McDouchebag needs some lovin'</p>
            <p>
              Nothing like a bit of speed dating to get your{' '}
              <span className="loves">heart pumping!</span>
            </p>

            <p>
              Try and make your dates heart race by figuring out
              <br />
              what she loves and hates.
            </p>

            <p>
              The girls gradually reveal their interests.
              <br />
              Discard the bad cards and keep the good ones <br />
              to make a perfect hand and win them over!
            </p>
          </Text>
        </HeaderItem>
      </Header>
      <ButtonList>
        <AnimatePresence>
          {config.difficulties.map(({ name, description }, i) => (
            <ListItem
              custom={i}
              variants={buttons}
              key={name}
              initial="initial"
              animate="enter"
              exit="exit"
              layout
            >
              <MenuButton
                difficultyName={name}
                description={description}
                onClick={() => {
                  dispatch({ type: 'game.start', value: name })
                }}
              >
                <Player spriteId={name} />
              </MenuButton>
            </ListItem>
          ))}
        </AnimatePresence>
      </ButtonList>
    </>
  )
}

export const screenName: GameScreenName = 'MENU'
