import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => {
  return (
    <div className="welcome">
      <p>지인들과 내가 모은 꿀팁을 공유하세요!</p>
      <button className="button--link" onClick={startLogin}>
        <img src="/images/googleLoginBtn.png" />
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
