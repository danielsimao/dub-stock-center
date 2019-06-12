import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteFavStock } from "../actions/favStockActions";
import { connect } from "react-redux";

const ConfirmationModal = ({
  isOpen,
  toggle,
  currency,
  symbol,
  deleteFavStock,
  id
}) => {
  const deleteHandler = id => deleteFavStock(id);

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
          <Button
            color="danger"
            onClick={() => {
              toggle(!isOpen);
              deleteHandler(id);
            }}
          >
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

const mapStateToProps = state => ({
  favStock: state.favStock
});

export default connect(
  mapStateToProps,
  { deleteFavStock }
)(ConfirmationModal);
