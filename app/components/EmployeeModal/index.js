/* eslint-disable no-unused-expressions */
import React, {  useState, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Form from './Form';
import Input from './Input';
import Error from './Error';

const EmployeeModal = ({ handleSubmit }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  const [err, setErr] = useState('');
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleClickSubmit = async () => {
    const result = await handleSubmit({ email, name, department, position });
    result ? handleClose() : setErr("something's wrong:cannot add new employee");
  };

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        ADD Employee
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Information</Modal.Title>
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
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={useCallback(e => setName(e.target.value))}
            />
            <Input
              id="position"
              type="text"
              placeholder="Position"
              value={position}
              onChange={useCallback(e => setPosition(e.target.value))}
            />
            <Input
              id="department"
              type="text"
              placeholder="Department"
              value={department}
              onChange={useCallback(e => setDepartment(e.target.value))}
            />
          </Form>
          <Error>{err}</Error>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

EmployeeModal.propTypes = {
  handleSubmit: PropTypes.func,
};

export default EmployeeModal;
