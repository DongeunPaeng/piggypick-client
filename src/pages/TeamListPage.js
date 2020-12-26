import React from "react";
import Header from "../components/Header";
import Teams from "../components/Teams";
import axios from "axios";
import { history } from "../routers/AppRouter";

export default class TeamListPage extends React.Component {
  state = {
    teams: [],
    selectedTeam: undefined
  };

  handleJoin = teamId => {
    const confirm = window.confirm("Would you join?");
    if (confirm === true) {
      axios({
        method: "post",
        url: "api/teams",
        data: {
          id: teamId
          // user's id needed here...
        }
      }).then(res => {
        if (res.status === 200) {
          console.log("join complete!");
          history.push(`/items/${teamId}`);
        }
      });
    }
  };

  fetchTeams = () => {
    axios
      .get("api/teams")
      .then(res => {
        const teams = res.data;
        this.setState(() => ({ teams }));
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchTeams();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.teams.length !== this.state.teams.length) {
      this.fetchTeams();
    }
  }

  render() {
    const title = "어디 갈까?";
    const subtitle = "선택장애 한 방에 해결하기";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <div className="widget">
            <Teams teams={this.state.teams} handleJoin={this.handleJoin} />
          </div>
        </div>
      </div>
    );
  }
}
