import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Team = ({ count, teamId, optionText, handleJoin, uid }) => {
  const [teams, setTeams] = useState([]);

  const fetchUsersTeams = () => {
    console.log('fetchUsersTeams doing')
    axios.get(`/api/users/${uid}/teams`).then(res => {
      const fetchedTeams = res.data.map(data => data.team_id);
      setTeams(fetchedTeams);
    });
  };

  useEffect(() => {
    fetchUsersTeams();
  }, []);

  return (
    <div className="option">
      <p className="option__text">
        {count}. {optionText}
      </p>
      {teams.indexOf(teamId) !== -1 ? (
        <Link
          className="button button--link"
          to={{ pathname: `/items/${teamId}` }}
        >
          Get In
        </Link>
      ) : (
        <button
          className="button button--link"
          onClick={() => {
            handleJoin(teamId, uid);
          }}
        >
          Join
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  uid: state.auth.uid
});

export default connect(mapStateToProps)(Team);
