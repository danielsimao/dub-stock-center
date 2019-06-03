import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const LoginModal = props => {
  const [modal, toggleModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const toggle = useCallback(() => {
    props.clearErrors();
    toggleModal(!modal);
  });

  useEffect(() => {
    if (props.error.id === "LOGIN_FAIL") {
      setMsg(props.error.msg.msg);
    } else {
      setMsg(null);
    }

    if (modal) {
      if (props.isAuthenticated) {
        toggle();
      }
    }
  }, [
    modal,
    props.error.id,
    props.error.msg.msg,
    props.isAuthenticated,
    toggle
  ]);

  const onSubmit = e => {
    e.preventDefault();

    const user = { email, password };

    props.login(user);
  };

  return (
    <div>
      <NavLink onClick={() => toggle()} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            {" "}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={e => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={e => setPassword(e.target.value)}
              />

              <Button
                color="dark"
                style={{ marginTop: "2rem", display: "block" }}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
