import React, { useState } from "react";
import "./NamedEntity.scss";
import { NAMED_ENTITY } from "../../utils/constants";
import QuestionAnswerSect from "./rightSection/questionAnswerSection";

function EntitySection({ response, onWordClick }) {
  console.log('response in entity', response)
  const [expandedKey, setExpandedKey] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCardClick = (key) => {
    setExpandedKey(expandedKey === key ? null : key);
    if(expandedKey !== key) {
      onWordClick(response[key][0].paragraph);
    }
    
  };

  const context = response[expandedKey];
  console.log('context--', context)
  const payload = context?.map((each)=>{
    return Object.values(each)[0]
  })
  const contextObj = {'question': payload}

  return (
    <div className="entity-section">
      <h2 className="toggle-button" onClick={toggleExpand}>
        {NAMED_ENTITY}
      </h2>
      {expanded &&
        Object.keys(response).map((key) => (
          <div key={key} className="entity-card">
            <h2 onClick={() => handleCardClick(key)}>{key}</h2>
            {expandedKey === key && (
              <div className="card-details">
                <ul>
                  {response[key].map((phrase, index) => (
                    <>
                      <li key={index}>
                        {Object.values(phrase)[0]}
                      </li>
                    </>
                  ))}
                  <QuestionAnswerSect context={contextObj || {}} namedEntity={key} />
                </ul>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default EntitySection;
