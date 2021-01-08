import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import cookieMonster from '../monster32.png';

const Item = ({ firstItem, id, name, cost, value, type, numOwned, handleItemClick }) => {
  const itemButton = useRef(null);

  useEffect(() => {
    if (firstItem) {
      itemButton.current.focus();
    }
  }, [firstItem]);
  
  return (
    <Button id={id} onClick={handleItemClick} ref={itemButton}>
      <div>
        <Name>{name}</Name>
        <Detail>Cost: {cost} cookie(s). Produces {value} {type === 'tick' ? 'cookies/second.' : 'cookies/click'}</Detail>
      </div>
      <Owned>
        {numOwned}
      </Owned>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 0;
  box-shadow: none;
  background: none;
  text-align: left;
  border-bottom: 1px solid gray;
  padding: 20px 20px 20px 0;
  color: white;
  cursor: url(${cookieMonster}), pointer;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const Detail = styled.p`
  color: lightgray;
  font-size: 0.8rem;
`;

const Owned = styled.span`
  font-size: 2rem;
  margin-left: 20px;
`;

export default Item;
