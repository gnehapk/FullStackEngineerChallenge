/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/**
 *
 * EmployeeAdminPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import AddEditReviewModal from '../../components/AddEditReviewModal';
import InputEmailModal from '../../components/InputEmailModal/index';

const Container = styled.div`
  margin-top: 80px;
`;

const EmployeeSection = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background: #baffff;
  border-radius: 10px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const SubTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Des = styled.div`
  font-size: 12px;
`;

const getEmployeesRemain = async email => {
  const response = await fetch(
    `http://localhost:3000/api/reviews/remain?email=${email}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const json = await response.json();
  return json.employees;
};

export function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [showAddEditReviewModal, setShowAddEditReviewModal] = useState(false);
  const [showInputEmail, setShowInputEmail] = useState(true);
  const [email, setEmail] = useState('');

  const handleClickRemainReview = data => {
    setSelectedEmployee(data);
    setShowAddEditReviewModal(true);
  };

  const handleClickClosePopup = () => {
    setShowAddEditReviewModal(false);
  };

  const AddEditReview = async input => {
    const response = await fetch('http://localhost:3000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        review: {
          content: input.content,
          employeeId: selectedEmployee._id,
          author: email,
          id: input.id ? input.id : null,
        },
      }),
    });
    const json = await response.json();
    setTrigger(!trigger);
    return json;
  };

  useEffect(() => {
    getEmployeesRemain(email).then(data => {
      setEmployees(data);
    });
  }, [trigger, email]);

  return (
    <Container>
      <Title>Remainning Review Tasks</Title>
      <SubTitle>Performance Employees</SubTitle>
      {employees.map(data => (
        <EmployeeSection
          key={`remain${data._id}`}
          onClick={() => handleClickRemainReview(data)}
        >
          <Name>{data.name}</Name>
          <Des>Position : {data.position}</Des>
          <Des>Deparment : {data.department}</Des>
          <Des>Need Review Perfomance</Des>
        </EmployeeSection>
      ))}
      <AddEditReviewModal
        review={{}}
        showPopup={showAddEditReviewModal}
        handleSubmit={AddEditReview}
        handleClickClosePopup={handleClickClosePopup}
        showButton={false}
      />
      <InputEmailModal
        handleSubmit={emailInput => {
          setEmail(emailInput);
          setShowInputEmail(false);
        }}
        showPopup={showInputEmail}
      />
    </Container>
  );
}

EmployeePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(EmployeePage);
