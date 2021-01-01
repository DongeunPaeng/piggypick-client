import React from "react";
import Modal from "react-modal";

const JoinModal = props => (
  <Modal
    onRequestClose={props.onSubmit}
    isOpen={!!props.modalOpen}
    contentLabel="Join the Team"
    closeTimeoutMS={300}
    className="modal"
  >
    <h3 className="modal__title">모임 참여하기!</h3>
    <p className="modal__body">PASSWORD</p>
    <p className="modal__body">문의: dongeun.paeng@gmail.com</p>
    <form className="add-option" onSubmit={props.onSubmit}>
      <input className="add-option__input" type="password" name="password" />
      <button className="button" >
        Join
      </button>
    </form>
  </Modal>
);

export default JoinModal;
