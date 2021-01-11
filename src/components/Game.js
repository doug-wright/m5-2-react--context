import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import useSound from 'use-sound';

import Item from './Item';
import useKeydown from '../hooks/useKeydown';
import useDocumentTitle from '../hooks/useDocumentTitle';

import cookieSrc from "../cookie.svg";
import cookieMonster from '../monster32.png';
import sndCrunch from '../crunch.mp3';
import sndCookieMonster from '../cookie-monster.mp3';

const Game = ({
  numCookies,
  setNumCookies,
  cookiesPerClick,
  setCookiesPerClick,
  purchasedItems,
  setPurchasedItems,
  calculateCookiesPerTick,
  items }
) => {
  const [playCrunch] = useSound(sndCrunch);
  const [playCookieMonster] = useSound(sndCookieMonster);

  useEffect(() => {
    playCookieMonster();
  }, [playCookieMonster]);

  const handleItemClick = (event) => {
    const index = items.findIndex(item => item.id === event.currentTarget.id);
    const item = items[index];

    if (numCookies >= item.cost) {
      if (item.id === 'megacursor') {
        setCookiesPerClick(cookiesPerClick + item.value);
      }

      setNumCookies(numCookies - item.cost);
      setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
    } else {
      window.alert(`You can't afford a ${item.name}`);
    }

    // Increase pricing a random percentage from 1 to 10
    const percentInc = Math.floor((Math.random() * 10) + 1) / 100 + 1;
    const newCost = Math.floor(percentInc * item.cost);

    items[index].cost = newCost;
  }
  
  const handleCookieClick = () => {
    setNumCookies(numCookies + cookiesPerClick);
    playCrunch();
  }

  useDocumentTitle(numCookies + ' - Cookie Clicker', 'Cookie Clicker');
  useKeydown('Space', handleCookieClick);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second, <strong>{cookiesPerClick}</strong> cookie(s) per click
        </Indicator>
        <Button onClick={handleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => <Item
          firstItem={index === 0 ? true : false}
          key={uuidv4()}
          id={item.id}
          name={item.name}
          cost={item.cost}
          value={item.value}
          type={item.type}
          numOwned={purchasedItems[item.id]}
          handleItemClick={handleItemClick} />)}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: url(${cookieMonster}), pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 450px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
