import React, { createContext, useState } from 'react';

import usePersistedState from '../hooks/usePersistedState';
import items from '../data';

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState(100, 'num-cookies');
  const [cookiesPerClick, setCookiesPerClick] = usePersistedState(1, 'cookies-per-click');
  const [purchasedItems, setPurchasedItems] = usePersistedState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megacursor: 0
  }, 'purchased-items');
  const now = new Date();
  const [time, setTime] = usePersistedState(Math.round(now.getTime() / 1000), 'time');
  const itemsDefault = items;

  const calculateCookiesPerTick = (purchasedItems) => {
    let totalValue = 0;

    Object.keys(purchasedItems).forEach(key => {
      const item = items.find(item => item.id === key);
      
      if (item.type === 'tick') {
        totalValue += purchasedItems[key] * item.value;
      }
    });

    return totalValue;
  }
  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        cookiesPerClick,
        setCookiesPerClick,
        purchasedItems,
        setPurchasedItems,
        calculateCookiesPerTick,
        items,
        time,
        setTime,
        itemsDefault
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
