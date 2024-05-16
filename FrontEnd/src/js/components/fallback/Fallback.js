import React from 'react';
import './Fallback.scss';

const Fallback = props => {
  return <div className="fallback">{props.children}</div>;
};

export default Fallback;
