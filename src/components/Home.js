import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import imgCookieMonster from '../cookie-monster.png';

const Home = () => {

  return (
    <Wrapper>
      <Title>Cookie game</Title>
      <Link to="/game">Go to game</Link>
      <Img src={imgCookieMonster} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 32px;
`;

const scaleIt = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
`;

const Img = styled.img`
  margin-top: 50px;
  animation: ${scaleIt} 0.8s alternate infinite ease-in-out;
`;

export default Home;
