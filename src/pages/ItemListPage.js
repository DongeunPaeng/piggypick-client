import React from "react";
import Action from "../components/Action";
import AddOption from "../components/AddOption";
import Header from "../components/Header";
import Options from "../components/Options";
import OptionModal from "../components/OptionModal";
import axios from "axios";
import { history } from "../routers/AppRouter";
import { connect } from "react-redux";

export class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    options: [],
    selectedOption: undefined,
    authChecked: false
  };

  handlePick = () => {
    const option = this.state.options[
      Math.floor(Math.random() * this.state.options.length)
    ];
    this.setState(() => ({
      selectedOption: option
    }));
  };

  handleAddOption = (option, teamId) => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }
    axios
      .post("/api/items", {
        uid: this.props.uid,
        name: option,
        teamId
      })
      .then(res => {
        if (res.status === 200) {
          this.setState(prevState => ({
            options: prevState.options.concat(option)
          }));
        }
      })
      .catch(err => console.log(err));
  };

  // TODO: need to modify according to the new roles in DB...
  handleDeleteOption = optionToRemove => {
    const confirm = window.confirm("지우면 영원히 사라져요. 괜찮아요?");
    if (confirm === true) {
      axios({
        method: "delete",
        url: "/api/items",
        data: {
          name: optionToRemove
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.setState(prevState => ({
              options: prevState.options.filter(
                option => optionToRemove !== option
              )
            }));
          }
        })
        .catch(err => console.log(err));
    }
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  authCheck = () => {
    const teamId = window.location.pathname.split("/")[2];
    axios
      .get(`/api/users/${teamId}-split-${this.props.uid}`)
      .then(res => {
        if (res.status === 200) {
          this.setState(() => ({ authChecked: true }));
        }
      })
      .catch(err => {
        history.push("/teams");
        console.log(err);
      });
  };

  fetchRestaurants = () => {
    const { id } = this.props.match.params;
    axios
      .get(`/api/items/${id}`)
      .then(res => {
        const options = res.data;
        this.setState(() => ({ options }));
      })
      .catch(err => {
        history.push("/teams");
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchRestaurants();
    this.authCheck();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      this.fetchRestaurants();
    }
  }

  render() {
    const title = "어디 갈까?";
    const subtitle = "선택장애 한 방에 해결하기";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          {this.state.authChecked && (
            <div>
              <Action
                handlePick={this.handlePick}
                hasOptions={this.state.options.length > 0}
              />
              <div className="widget">
                <AddOption handleAddOption={this.handleAddOption} />
                <Options
                  options={this.state.options}
                  handleDeleteOptions={this.handleDeleteOptions}
                  handleDeleteOption={this.handleDeleteOption}
                />
              </div>
              <OptionModal
                selectedOption={this.state.selectedOption}
                handleClearSelectedOption={this.handleClearSelectedOption}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  title: "어디 갈까?"
};

const mapStateToProps = state => ({
  uid: state.auth.uid
});

export default connect(mapStateToProps)(ItemList);
