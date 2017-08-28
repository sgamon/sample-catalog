import React from 'react';
// import './Button.css';

/**
 *
 * @param {object} props {string} text
 *                       {boolean} active ? true if active
 * @return {XML}
 * @constructor
 */
let Button = (props) => {
  let activeClass = props.active ? 'active' : '';
  return <button type="button" className={activeClass} onClick={props.handleClick}>{props.text}</button>
};


export default Button;
