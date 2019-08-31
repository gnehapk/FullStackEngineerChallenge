/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/**
 *
 * AdminPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import styled from 'styled-components';
import makeSelectAdminPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import EmployeeModal from '../../components/EmployeeModal/index';
import history from '../../utils/history';

const Container = styled.div`
  margin-top: 80px;
`;

const EmployeeList = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #d3d3d3;
  & div + div {
    margin-top: 10px;
  }
`;

const Employee = styled.div`
  padding: 10px;
  background: #ebebeb;
  box-shadow: 1px 2px 1px 0.1;
  cursor: pointer;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Position = styled.div`
  font-weight: 500;
`;
const Department = styled.div`
  font-size: 12px;
`;

const getEmployees = async () => {
  const response = await fetch('http://localhost:3000/api/employees/current', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json.employees;
};

export function AdminPage() {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });
  const [employees, setEmployees] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const addEmployee = async input => {
    const response = await fetch('http://localhost:3000/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employee: {
          email: input.email,
          name: input.name,
          position: input.position,
          department: input.department,
        },
      }),
    });
    const json = await response.json();
    setTrigger(!trigger);
    return json;
  };

  useEffect(() => {
    getEmployees().then(data => {
      setEmployees(data);
    });
  }, [trigger]);

  return (
    <Container>
      <EmployeeModal handleSubmit={addEmployee} />
      <EmployeeList>
        {employees.map(item => (
          <Employee
            key={item._id}
            onClick={() => {
              history.push(`employee-admin/${item._id}`);
            }}
          >
            <Name>{item.name}</Name>
            <Position>Position : {item.position}</Position>
            <Department>Department : {item.department}</Department>
          </Employee>
        ))}
      </EmployeeList>
    </Container>
  );
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminPage: makeSelectAdminPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);
