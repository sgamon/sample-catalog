import React from 'react';
import './Button.css';
import './IconButton.css';

/**
 *
 * @param {object} props {string} icon
 * @return {XML}
 * @constructor
 */
let IconButton = (props) => {
  let iconClass = `fa fa-${props.icon}`;
  return <button type="button" onClick={props.clickHandler}><i className={iconClass}></i></button>
};


export default IconButton;
