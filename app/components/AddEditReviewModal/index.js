/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React, { useState, useCallback, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Form from './Form';
import Input from './Input';
import Error from './Error';

const AddEditReviewModal = ({
  handleSubmit,
  review = {},
  showPopup,
  handleClickClosePopup,
  showButton = true,
}) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    review.content?setContent(review.content):null
  }, [review.content]);

  useEffect(() => {
    setShow(showPopup);
  }, [showPopup]);

  const handleClose = () => {
    // setShow(false);
    handleClickClosePopup(false);
  };
  const handleShow = () => {
    handleClickClosePopup(true);
    // setShow(true);
  };

  const handleClickSubmit = async () => {
    if (review._id) {
      const result = await handleSubmit({
        id: review._id,
        content,
      });
      result
        ? handleClose()
        : setErr("something's wrong:cannot add review performance");
    } else {
      const result = await handleSubmit({
        content,
      });
      result
        ? handleClose()
        : setErr("something's wrong:cannot add review performance");
    }
  };

  return (
    <>
      {showButton ? (
        <Button variant="info" onClick={handleShow}>
          Add Review Performance Employee
        </Button>
      ) : null}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Review Performance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Input
              id="content"
              type="text"
              placeholder="what did you think about him/her"
              value={content}
              onChange={useCallback(e => setContent(e.target.value))}
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

AddEditReviewModal.propTypes = {
  handleSubmit: PropTypes.func,
  review: PropTypes.object,
  showPopup: PropTypes.bool,
  handleClickClosePopup: PropTypes.func,
  showButton: PropTypes.bool,
};

export default AddEditReviewModal;
