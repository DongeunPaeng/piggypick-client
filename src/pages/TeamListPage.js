import React from "react";
import Header from "../components/Header";
import Teams from "../components/Teams";
import JoinModal from "../components/JoinModal";
import axios from "axios";
import { history } from "../routers/AppRouter";
import AddTeam from "../components/AddTeam";

export default class TeamListPage extends React.Component {
  state = {
    teams: [],
    targetTeam: "",
    modalOpen: undefined,
    uid: undefined
  };

  handleJoin = (teamId, uid) => {
    this.setState(() => ({
      modalOpen: true,
      targetTeam: teamId,
      uid
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const password = e.target.elements.password.value;
    const teamId = this.state.targetTeam;
    const uid = this.state.uid;

    if (true) {
      axios({
        method: "post",
        url: "api/teams",
        data: {
          id: teamId,
          password,
          uid
        }
      })
        .then(res => {
          if (res.status === 200) {
            history.push(`/items/${teamId}`);
          }
        })
        .catch(err => {
          alert("wrong password!");
          console.log(err);
        });
    }
    this.setState(() => ({ modalOpen: undefined }));
  };

  // TODO: modify
  handleAddTeam = (option, password) => {
    const index = this.state.teams.findIndex(team => {
      return team.name === option;
    });
    if (!option || !password) {
      return "Enter valid value to add item";
    } else if (index > -1) {
      return "This team already exists";
    }
    axios
      .post("/api/teams/make", {
        password,
        name: option
      })
      .then(res => {
        if (res.status === 200) {
          this.setState(prevState => ({
            teams: prevState.teams.concat(option)
          }));
        }
      })
      .catch(err => console.log(err));
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
            <AddTeam handleAddTeam={this.handleAddTeam} />
            <Teams teams={this.state.teams} handleJoin={this.handleJoin} />
          </div>
        </div>
        <JoinModal
          modalOpen={this.state.modalOpen}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
