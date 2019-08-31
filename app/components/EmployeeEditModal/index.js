/* eslint-disable no-unused-expressions */
import React, { useState, useCallback, useEffect } from 'react';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Form from './Form';
import Input from './Input';
import Error from './Error';

const getEmployees = async () => {
  const response = await fetch('http://localhost:3000/api/employees/current', {
    method: 'GET',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json.employees;
};

const EmployeeModal = ({ handleSubmit, employee }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(employee.email);
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position);
  const [department, setDepartment] = useState(employee.department);
  const [employees, setEmployees] = useState([]);
  const [assignPerson, setAssignPerson] = useState(null);

  const [err, setErr] = useState('');
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    getEmployees().then(data => {
      setEmployees(data);
      setAssignPerson(data.filter(person => employee.assign == person._id)[0]);
    });
  }, [employee]);
  useEffect(() => {
    setEmail(employee.email);
    setName(employee.name);
    setPosition(employee.position);
    setDepartment(employee.department);
  }, [employee]);

  const handleClickSubmit = async () => {
    const result = await handleSubmit({
      email,
      name,
      department,
      position,
      assign: assignPerson._id,
    });
    result ? handleClose() : setErr("something's wrong:cannot edit information");
  };

  const handleClickAssign = useCallback(
    data => () => {
      setAssignPerson(data);
    },
    [],
  );

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Edit & Assign Review Employee
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
            <Dropdown style={{ marginLeft: '25px' }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Have to review :{' '}
                {assignPerson ? assignPerson.name : 'Assign Review'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {employees
                  .filter(
                    data =>
                      data.department === employee.department &&
                      employee._id != data._id,
                  )
                  .map(data => (
                    <Dropdown.Item
                      key={`dd${data._id}`}
                      onClick={handleClickAssign(data)}
                    >
                      {data.name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
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
  employee: PropTypes.object,
};

export default EmployeeModal;
