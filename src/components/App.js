import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import usePersistedState from '../hooks/usePersistedState';

import items from '../data';

function App(props) {
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
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems}
            calculateCookiesPerTick={calculateCookiesPerTick}
          />
        </Route>
        <Route path="/game">
          <Game
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            cookiesPerClick={cookiesPerClick}
            setCookiesPerClick={setCookiesPerClick}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}
            calculateCookiesPerTick={calculateCookiesPerTick}
            items={items}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
