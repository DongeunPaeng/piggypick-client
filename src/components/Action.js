import React from "react";

const Action = props => (
  <div>
    <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      어디 갈까?
    </button>
  </div>
);

export default Action;
