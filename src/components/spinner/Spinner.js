import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.span`
  width: 30px;
  height: 30px;
  position: relative;

  background: transparent;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  border: 5px solid rgba(0, 0, 0, 0.1);
  border-bottom-color: #2DB5CF;
  animation: ${rotate360} 2s linear 0s infinite;
`;



const Spinner = () => {
  return(
    <Wrapper>
      <Loading />
    </Wrapper>
  );
}

export default Spinner;
