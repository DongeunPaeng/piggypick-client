import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

const Header = ({ email, title, subtitle, startLogout }) => (
  <div className="header">
    <div className="container">
      <div className="header__content">
        <div>
          <Link to="/teams">
            <h1 className="header__title">{title}</h1>
          </Link>
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
