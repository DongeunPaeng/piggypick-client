import React from "react";
import Action from "./Action";
import AddOption from "./AddOption";
import Header from "./Header";
import Options from "./Options";
import OptionModal from "./OptionModal";
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
      .post("http://localhost:3000/api/list", {
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
    axios({
      method: "delete",
      url: "http://localhost:3000/api/list",
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
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  fetchRestaurants = () => {
    axios
      .get("http://localhost:3000/api/list")
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
    const title = "Piggy Pick";
    const subtitle = "Lucky Tasty Daily Date!";

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
  title: "Indecision"
};
