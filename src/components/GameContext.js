import React, { createContext, useState } from 'react';

import usePersistedState from '../hooks/usePersistedState';
import items from '../data';

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState(100, 'num-cookies');
  const [cookiesPerClick, setCookiesPerClick] = useState(1);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megacursor: 0
  });

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
        items
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
