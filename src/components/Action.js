import React from "react";

const Action = props => (
  <div>
    <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      어디를 가볼까요오?
    </button>
  </div>
);

export default Action;
