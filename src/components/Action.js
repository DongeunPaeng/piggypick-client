import React from "react";

const Action = props => (
  <div>
    <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      랜덤 추천!
    </button>
  </div>
);

export default Action;
