import React from 'react';
//Styles
import './DateForm.scss';
//Bootstrap
import Form from 'react-bootstrap/Form';

const DateForm = ({ startDate, endDate, handleEndDateChange, handleStartDateChange }) => {
  return (
    <Form>
      <Form.Label>Search between dates</Form.Label>
      <Form.Group>
        <Form.Label>Start</Form.Label>
        <Form.Control type="date" value={startDate} min="2020-01-01" max="2021-01-31" onChange={handleStartDateChange}></Form.Control>
        <Form.Label>End</Form.Label>
        <Form.Control type="date" value={endDate} max="2021-01-31" onChange={handleEndDateChange}></Form.Control>
      </Form.Group>
    </Form>
  );
}

export default DateForm;