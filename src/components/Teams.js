import React from "react";
import Team from "./Team";

const Teams = props => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">모음집</h3>
    </div>
    {props.teams.length === 0 && (
      <p className="widget-message">아직 소속된 모음이 없군요...!</p>
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
