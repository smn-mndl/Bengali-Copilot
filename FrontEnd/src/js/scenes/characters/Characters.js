import React, { useState } from "react";
import './Characters.scss'

const Characters = ({ data }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleClick = (key) => {
    if (expandedItem === key) {
      setExpandedItem(null);
    } else {
      setExpandedItem(key);
    }
  };
  const characters = Object.keys(data);
  return (
    <div className="container">
    {characters.map(key => (
      <div key={key} className={`item ${expandedItem === key ? 'down' : ''}`} onClick={() => handleClick(key)}>
        <li className="item-li">{key}</li>
        {expandedItem === key && (
          <ul className="inner-list">
            {data[key].map((item, index) => (
              <li key={index} className="inner-item">
                {Object.keys(item).map(subKey => (
                  <p key={subKey}>{item[subKey]}</p>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
  );
};

export default Characters;
