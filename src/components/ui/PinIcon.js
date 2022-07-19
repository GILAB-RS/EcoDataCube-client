import React from 'react';

const PinIcon = (props) => {
  return (
    <svg className={props.className} ref={props.elem ? props.elem : () => {}} xmlns="http://www.w3.org/2000/svg" width="15" height="20.999269" viewBox="0 0 15 20.999269" version="1.1" id="svg880">
      <g id="g878">
        <g id="g876">
          <g id="g870" />
          <g clipPath="url(#ag6ya)" id="g874">
            <path d="M 7.5,0 C 11.636,0 15,3.412 15,7.605 15,12.81 8.288,20.45 8.002,20.773 a 0.67,0.67 0 0 1 -1.004,0 C 6.712,20.45 0,12.81 0,7.605 0,3.412 3.365,0 7.5,0 Z m 3.764,7.605 c 0,-2.11 -1.691,-3.826 -3.769,-3.826 -2.078,0 -3.768,1.716 -3.768,3.826 0,2.11 1.69,3.827 3.768,3.827 2.078,0 3.769,-1.717 3.769,-3.827 z" id="path872"
              connector-curvature="0"
              style={{fill: '#1A1A1A'}} />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default PinIcon;

