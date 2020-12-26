import React from "react";
import Option from "./Option";

const Options = props => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Options</h3>
    </div>
    {props.options.length === 0 && (
      <p className="widget-message">Please write something...</p>
    )}
    {props.options.map((option, index) => (
      <Option
        handleDeleteOption={props.handleDeleteOption}
        key={option.id}
        optionId={option.id}
        author={option.email}
        optionText={option.name}
        count={index + 1}
      />
    ))}
  </div>
);

export default Options;
