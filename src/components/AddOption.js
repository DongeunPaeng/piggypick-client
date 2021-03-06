import React from "react";

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    error: undefined
  };
  onSubmit = e => {
    e.preventDefault();
    const teamId = window.location.pathname.split('/')[2];
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option, teamId);
    this.setState(() => ({ error }));
    if (!error) {
      e.target.elements.option.value = "";
    }
  };
  render() {
    return (
      <div>
        {this.state.error && (
          <p className="add-option-error">{this.state.error}</p>
        )}
        <form className="add-option" onSubmit={this.onSubmit}>
          <input className="add-option__input" type="text" name="option" />
          <button className="button">추가하기</button>
        </form>
      </div>
    );
  }
}
