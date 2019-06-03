import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

const ItemModal = props => {
  const [modal, toggleModal] = React.useState(false);
  const [name, setName] = React.useState("");

  const onSubmit = e => {
    e.preventDefault();
    const newItem = {
      ...name
    };

    props.addItem(newItem);

    toggleModal(!modal);
  };

  return (
    <div>
      {props.isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => toggleModal(!modal)}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={() => toggleModal(!modal)}>
        <ModalHeader toggle={() => toggleModal(!modal)}>
          Add To Shopping List
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            {" "}
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={e => setName({ [e.target.name]: e.target.value })}
              />
              <Button
                color="dark"
                style={{ marginTop: "2rem", display: "block" }}
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
