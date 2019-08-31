import React, { useState, useCallback, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Form from './Form';
import Input from './Input';

const InputEmailModal = ({ handleSubmit, showPopup }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');

  const handleClickSubmit = async () => {
    handleSubmit(email);
  };

  useEffect(() => {
    setShow(showPopup);
  }, [showPopup]);

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Enter Your Employee Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={useCallback(e => setEmail(e.target.value))}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClickSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

InputEmailModal.propTypes = {
  handleSubmit: PropTypes.func,
  showPopup: PropTypes.bool,
};

export default InputEmailModal;
