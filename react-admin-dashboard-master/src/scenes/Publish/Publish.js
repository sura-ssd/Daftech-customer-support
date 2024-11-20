import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { Typography } from '@mui/material';

const API_BASE_URL = 'https://localhost:7291/api';

function Publish() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get('clientId');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSetPublishDate = async () => {
    const requestBody = {
      clientId: parseInt(clientId), 
      startDate: startDate,
      endDate: endDate
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/Publish/set-publish-date/${clientId}`, requestBody);
      
      setSuccessMessage('Publish date set successfully');
      

      // Clear the success message after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
    } catch (error) {
      console.error('Error setting publish date:', error);
      // Handle error behavior, such as showing an error message
    }
  };

  return (
    <div className="container mt-5">
      {successMessage && (
        <div className="position-fixed top-0 end-0 p-3">
          <div className="toast show bg-success text-white" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Success</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              {successMessage}
            </div>
          </div>
        </div>
      )}
      <Card className="border-0 shadow p-3 me-2 w-75">
        <Card.Body>
          <Typography fontSize="35px">Set Publish Date</Typography>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <Button className="btn btn-success" onClick={handleSetPublishDate}>
              Set Publish Date
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Publish;
