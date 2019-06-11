import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationModal = ({
  isOpen,
  toggle,
  deleteHandler,
  currency,
  symbol
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Delete confirmation</ModalHeader>
        <ModalBody>
          <b>Are you sure you want to delete the following favorite stock?</b>
          <br />
          <br />
          Symbol: <b>{symbol}</b>
          <br />
          Currency: <b>{currency}</b>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteHandler}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={() => toggle(!isOpen)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
