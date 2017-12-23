import React from 'react'

const Spinner = props => {
  return (
    <div className="loader loader--style8" title="7">
      <svg version="1.1" id="Layer_1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24">
        <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
          <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
  )
}

export default Spinner;











// import React from 'react';
// import styled, { keyframes } from 'styled-components';
//
// const Wrapper = styled.span`
//   width: 30px;
//   height: 30px;
//   position: relative;
//
//   background: transparent;
// `;
//
// const rotate360 = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;
//
// const Loading = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 100%;
//   margin: auto;
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//
//   border: 5px solid rgba(0, 0, 0, 0.1);
//   border-bottom-color: #2DB5CF;
//   animation: ${rotate360} 2s linear 0s infinite;
// `;
//
//
//
// const Spinner = () => {
//   return(
//     <Wrapper>
//       <Loading />
//     </Wrapper>
//   );
// }
//
// export default Spinner;
