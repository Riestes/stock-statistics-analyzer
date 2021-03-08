import React from 'react';
//Bootstrap
import Button from 'react-bootstrap/Button';

const ResetButton = ({ handleResetClick }) => {
  return (
    <Button variant="outline-danger" onClick={handleResetClick}>Reset dates</Button>
  );
}

export default ResetButton;