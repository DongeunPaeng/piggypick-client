import React from "react";
import Action from "../components/Action";
import AddOption from "../components/AddOption";
import Header from "../components/Header";
import Options from "../components/Options";
import OptionModal from "../components/OptionModal";
import axios from "axios";

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  handlePick = () => {
    const option = this.state.options[
      Math.floor(Math.random() * this.state.options.length)
    ];
    this.setState(() => ({
      selectedOption: option
    }));
  };

  handleAddOption = option => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }
    axios
      .post("/api/list", {
        name: option
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

  handleDeleteOption = optionToRemove => {
    const confirm = confirm("지우면 영원히 사라져요. 괜찮아요?");
    if (confirm === true) {
      axios({
        method: "delete",
        url: "/api/list",
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

  fetchRestaurants = () => {
    axios
      .get("/api/list")
      .then(res => {
        const options = res.data.map(data => data.name);
        this.setState(() => ({ options }));
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchRestaurants();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      this.fetchRestaurants();
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    const title = "Pig Pick";
    const subtitle = "Lucky Tasty Daily Pick!";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

Header.defaultProps = {
  title: "Pig Pick"
};
