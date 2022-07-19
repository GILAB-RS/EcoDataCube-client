import React from 'react';

const DropdownIcon = (props) => {
  return (
    <div style={props.style ? props.style : {}} className={"dropdown-" + (props.dropdown ? props.dropdown : 'right')}></div>
  )
}

export default DropdownIcon;