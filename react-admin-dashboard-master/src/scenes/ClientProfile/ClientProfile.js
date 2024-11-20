import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Typography, Avatar } from '@mui/material';
import { BsPerson, BsEnvelope, BsPhone, BsHouse, BsGeoAlt } from 'react-icons/bs';

const API_BASE_URL = 'https://localhost:7291/api';

function ClientProfile() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({});
  const [renewSuccessMessage, setRenewSuccessMessage] = useState('');
  const [errorRenewSuccessMessage, seterrorRenewSuccessMessage] = useState('');
  const [latestRenewedEndDate, setLatestRenewedEndDate] = useState(null);

  useEffect(() => {
    fetchClientProfile(clientId);
    fetchLatestRenewedEndDate(clientId);
  }, [clientId]);

  const fetchClientProfile = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Client/GetClient/${id}`);
      setClient(response.data);
    } catch (error) {
      console.error('Error fetching client profile:', error);
    }
  };

  const fetchLatestRenewedEndDate = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Publish/get-publish-dates/${id}`);
      if (response.data.length > 0) {
        const latestEndDate = response.data[response.data.length - 1].EndDate;
        setLatestRenewedEndDate(latestEndDate);
      }
    } catch (error) {
      console.error('Error fetching latest renewed end date:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSetPublishDate = () => {
    // Navigate to the "publish" route when the button is clicked
    navigate(`/publish?clientId=${clientId}`);
  };

  const handleRenewPublishDate = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Publish/renew-publish-date/${clientId}`);
      const renewedEndDate = formatDate(response.data.endDate);
      setRenewSuccessMessage(`Publish date renewed successfully. New end date: ${renewedEndDate}`);
      setLatestRenewedEndDate(response.data.endDate);
    } catch (error) {
      console.error('Error renewing publish date:', error);
      seterrorRenewSuccessMessage('Failed to renew publish date.');
    }
  };

  return (
    <div className="container mt-5">
      <Card className="border-0 shadow p-3 me-2 w-75">
        <Card.Body>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize="35px">Client Profile</Typography>
            <Avatar style={{ marginLeft: '10px' }} />
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label><BsPerson />&nbsp; <strong>Username:</strong></Form.Label>
              <Form.Control type="text" readOnly value={client.username} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><BsEnvelope />&nbsp;&nbsp;<strong>Email:</strong></Form.Label>
              <Form.Control type="email" readOnly value={client.email} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><BsPhone />&nbsp;<strong>Phone Number:</strong></Form.Label>
              <Form.Control type="text" readOnly value={client.phoneNumber} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><BsHouse />&nbsp;<strong>City:</strong></Form.Label>
              <Form.Control type="text" readOnly value={client.city} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><BsGeoAlt />&nbsp;<strong>Region:</strong></Form.Label>
              <Form.Control type="text" readOnly value={client.region} />
            </Form.Group>

            {/* Display Latest Renewed End Date */}
            {latestRenewedEndDate && (
              <Form.Group className="mb-3">
                <Form.Label><strong>Next payment Date:</strong></Form.Label>
                <p>{formatDate(latestRenewedEndDate)}</p>
              </Form.Group>
            )}

            <Row>
              <Col>
                <Button className="btn btn-success" onClick={handleSetPublishDate}>
                  Set New Publish Date
                </Button>
              </Col>
              <Col>
                <Button className="btn btn-primary" onClick={handleRenewPublishDate}>
                  Renew Publish Date
                </Button>
                {renewSuccessMessage && <p className="text-success mt-2">{renewSuccessMessage}</p>}
                {errorRenewSuccessMessage && <p className="text-danger mt-2">{errorRenewSuccessMessage}</p>}
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ClientProfile;
