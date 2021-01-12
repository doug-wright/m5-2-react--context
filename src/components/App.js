import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import { GameContext } from "./GameContext";
import useInterval from '../hooks/use-interval.hook';

function App() {
  // Use context
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    calculateCookiesPerTick,
    time,
    setTime
  } = useContext(GameContext);

  // Generate auto cookies from when page was last closed
  useEffect(() => {
    if (!Object.values(purchasedItems).every(value => value === 0)) {
      const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
      const now = new Date();
      const nowSeconds = Math.round(now.getTime() / 1000);

      setNumCookies(numCookies + (nowSeconds - time) * numOfGeneratedCookies);
    }
  }, []);

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
  
    if (!Object.values(purchasedItems).every(value => value === 0)) {
      const now = new Date();
      setTime(Math.round(now.getTime() / 1000));
    }

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
