import React from "react";

export default class AddTeam extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    error: undefined,
  };
  onSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const password = e.target.elements.password.value;
    const error = this.props.handleAddTeam(option, password);
    this.setState(() => ({ error }));
    if (!error) {
      e.target.elements.option.value = "";
      e.target.elements.password.value = "";
    }
  };
  render() {
    return (
      <div>
        <div className="widget-header">
          <h3 className="widget-header__title">직접 모음집을 추가해보세요!</h3>
        </div>
        {this.state.error && (
          <p className="add-option-error">{this.state.error}</p>
        )}
        <form className="add-option" onSubmit={this.onSubmit}>
          <div className="add-option__div">
            <label>Name: </label>
            <input className="add-option__input" type="text" name="option" />
          </div>
          <div className="add-option__div">
            <label>PW(영문): </label>
            <input
              className="add-option__input"
              type="password"
              name="password"
            />
          </div>
          <div className="add-option__div">
            <button className="button">추가하기</button>
          </div>
        </form>
      </div>
    );
  }
}
