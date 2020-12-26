import React from "react";

const Option = props => (
  <div className="option">
    <div>
      <p className="option__text">
        {props.count}. {props.optionText}
      </p>
      <p className="option__text--author">{props.author}</p>
    </div>
    <button
      className="button button--link"
      onClick={() => {
        alert('권한 문의: dongeun.paeng@gmail.com')
        // props.handleDeleteOption(props.optionText);
      }}
    >
      Remove
    </button>
  </div>
);

export default Option;
