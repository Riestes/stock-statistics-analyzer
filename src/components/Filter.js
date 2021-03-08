import React from 'react';
//Bootstrap
import Form from 'react-bootstrap/Form';

const Filter = ({ onChangeValue }) => {
  return (
    <Form>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label><h4>Filter listing</h4></Form.Label>
        <Form.Control as="select" custom onChange={onChangeValue}>
          <option value="date">Date</option>
          <option value="volume">Volume</option>
          <option value="smaPercentage">SMA5 %</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}

export default Filter;