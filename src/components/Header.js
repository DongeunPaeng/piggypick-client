import React from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

const Header = ({ email, title, subtitle, startLogout }) => (
  <div className="header">
    <div className="container">
      <div className="header__content">
        <div>
          <h1 className="header__title">{title}</h1>
          {subtitle && <h2 className="header__subtitle">{subtitle}</h2>}
        </div>
        <p>{email}</p>
        <button className="button" onClick={startLogout}>
          Sign Out
        </button>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  email: state.auth.email
});

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
