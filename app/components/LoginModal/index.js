/* eslint-disable no-unused-expressions */
import React, { memo, useState, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Form from './Form';
import Input from './Input';
import Error from './Error';

const LoginModal = ({ handleLogin }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleClickLogin = async () => {
    const result = await handleLogin(email, password);
    result ? handleClose() : setErr("password and username doesn't match");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        LOGIN
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={useCallback(e => setEmail(e.target.value))}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={useCallback(e => setPassword(e.target.value))}
            />
          </Form>
          <Error>{err}</Error>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

LoginModal.propTypes = {
  handleLogin: PropTypes.func,
};

export default LoginModal;
