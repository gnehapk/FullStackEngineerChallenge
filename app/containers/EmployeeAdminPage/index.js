/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/**
 *
 * EmployeeAdminPage
 *
 */

import React, { useEffect, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import EmployeeEditModal from '../../components/EmployeeEditModal/index';
import AddEditReviewModal from '../../components/AddEditReviewModal';
import AuthContext from '../App/Auth';

const Container = styled.div`
  margin-top: 80px;
`;

const EmployeeSection = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background: #baffff;
  border-radius: 10px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Des = styled.div`
  font-size: 12px;
`;

const ReviewSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #eaffff;
  border-radius: 10px;
  cursor: pointer;
`;

const AddReviewButton = styled.button`
  border: none;
  background: rgba(32, 186, 220, 0.1);
  font-size: 12px;
  padding: 10px;
  border-radius: 30px;
  margin: 20px;
  float: right;
`;

export function EmployeeAdminPage(props) {
  const getEmployee = async () => {
    const response = await fetch(
      `http://localhost:3000/api/employees?id=${props.match.params.id}`,
      {
        method: 'GET',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await response.json();
    return json.employee;
  };

  const getReviews = async employeeId => {
    const response = await fetch(
      `http://localhost:3000/api/reviews?id=${employeeId}`,
      {
        method: 'GET',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await response.json();
    return json.reviews;
  };

  const [employee, setEmployee] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [previousTrigger, setPreviousTrigger] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [triggerReviews, setTriggerReviews] = useState(false);
  const [showAddEditReviewModal, setShowAddEditReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const auth = useContext(AuthContext);

  const handleClickReview = useCallback(data => {
    setSelectedReview(data);
    setShowAddEditReviewModal(true);
  },[]);

  const handleClickClosePopup = () => {
    setShowAddEditReviewModal(false);
  };

  const editEmployee = async input => {
    const response = await fetch('http://localhost:3000/api/employees', {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employee: {
          email: input.email,
          name: input.name,
          position: input.position,
          department: input.department,
          assign: input.assign,
          id: employee._id,
        },
      }),
    });
    const json = await response.json();
    setTrigger(!trigger);
    return json;
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
          employeeId: employee._id,
          author: auth.user.email,
          id: input.id ? input.id : null,
        },
      }),
    });
    const json = await response.json();
    setTriggerReviews(!triggerReviews);
    return json;
  };

  useEffect(() => {
    employee == null || trigger !== previousTrigger
      ? getEmployee().then(data => {
          setEmployee(data);
          getReviews(data._id).then(reviewsData => {
            setReviews(reviewsData);
          });
        })
      : null;
    setPreviousTrigger(trigger);
  }, [employee, trigger]);

  useEffect(() => {
    employee != null
      ? getReviews(employee._id).then(reviewsData => {
          setReviews(reviewsData);
        })
      : null;
  }, [triggerReviews]);

  return (
    <Container>
      <EmployeeEditModal
        handleSubmit={editEmployee}
        employee={employee || {}}
      />
      <EmployeeSection>
        <Name>{employee ? employee.name : null}</Name>
        <Des>Position : {employee ? employee.position : null}</Des>
        <Des>Deparment : {employee ? employee.department : null}</Des>
        <Des>email : {employee ? employee.email : null}</Des>
      </EmployeeSection>
      <AddEditReviewModal
        review={selectedReview || {}}
        showPopup={showAddEditReviewModal}
        handleSubmit={AddEditReview}
        handleClickClosePopup={handleClickClosePopup}
      />
      {reviews.map(data => (
        <ReviewSection
          key={`${data._id}reviews`}
          onClick={() => handleClickReview(data)}
        >
          <Des>Perfomance Review : {data.content}</Des>
          <Des>id : {data._id}</Des>
        </ReviewSection>
      ))}
    </Container>
  );
}

EmployeeAdminPage.propTypes = {
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

export default compose(withConnect)(EmployeeAdminPage);
