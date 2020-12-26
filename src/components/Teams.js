import React from "react";
import Team from "./Team";

const Teams = props => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Teams</h3>
    </div>
    {props.teams.length === 0 && (
      <p className="widget-message">No team for you...</p>
    )}
    {props.teams.map((team, index) => (
      <Team
        handleJoin={props.handleJoin}
        key={team.id}
        teamId={team.id}
        optionText={team.name}
        count={index + 1}
      />
    ))}
  </div>
);

export default Teams;
