import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Image,
} from "react-bootstrap";
import "../components/style.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/Logo.jpg";
// import LoginForm from '../Pages/Login'
function Register() {
  const [city, setCity] = useState("");
  const [region, setSelectedRegion] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showExistingUserModal, setShowExistingUserModal] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  useEffect(() => {
    setIsPasswordValid(password.length >= 6);
  }, [password]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    try {
      const response = await axios.get(
        "https://localhost:7291/api/Client/GetClient"
      );
      const existingUser = response.data.find(
        (user) => user.username === username || user.email === email
      );
      if (existingUser) {
        setShowExistingUserModal(true);
        return;
      }
    } catch (error) {
      alert("Error checking existing users: " + error);
      return;
    }

    try {
      // Save the form data to the database
      await axios.post("https://localhost:7291/api/Client/AddClient", {
        city: city,
        region: region,
        email: email,
        phoneNumber: parseInt(phoneNumber),
        username: username,
        password: password,
      });

      // Show a success message

      // Reset form state
      setCity("");
      setSelectedRegion("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      setPasswordMatch(true);
      setSubmitted(true);

      // Show the success modal
      setShowModal(true);
      navigate("/LoginForm");
    } catch (err) {
      // Handle errors
      alert("Error: " + err);
    }
  };

  const handleCloseModal = () => {
    // Reset the form and close the modal
    setCity("");
    setSelectedRegion("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    setPasswordMatch(true);
    setSubmitted(false);
    setShowModal(false);
  };

  return (
    <div>
      <Container fluid className="d-flex justify-content-center mt-5">
        <Card border="0" className="w-50">
          <Row>
            <Col >
          <h3 class="mb-2 mt-5 mx-5 pb-md-0 mb-md-5">Registration Form</h3>  
          </Col>
          <Col >
          <Image src={Logo} alt="logo" className="my-4"></Image>
          </Col>
        </Row>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <Form.Group controlId="city" className="form-floating">
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      placeholder="city"
                    />
                    <Form.Label>City</Form.Label>
                  </Form.Group>
                </Col>
                <br md></br>
                <Col md="6">
                  <Form.Group controlId="region">
                    <Form.Select
                      style={{ height: "60px" }}
                      value={region}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      
                      required
                    >
                      <option value="">Select Region</option>
                      <option value="Addis Ababa">Addis Ababa</option>
                      <option value="Amhara">Amhara</option>
                      <option value="Oromia">Oromia</option>
                      <option value="SNNPR">SNNPR</option>                     
                      <option value="Tigray">Tigray</option>
                      <option value="Afar">Afar</option>
                      <option value="Dire Dawa">Dire Dawa</option>
                      <option value="Gambella">Gambella</option>
                      <option value="Harar">Harar</option>
                      <option value="Benshangul Gumuz">Benshangul Gumuz</option>
                      
                  
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <br></br>
              <Row>
                <Col md="6">
                  <Form.Group controlId="email" className="form-floating">
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="johnDoe123@gmail.com"
                    />
                    <Form.Label>Email</Form.Label>
                  </Form.Group>
                </Col>
                <br></br>
                <Col md="6">
                  <Form.Group controlId="phoneNumber" className="form-floating">
                    <Form.Control
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      placeholder="+251"
                    />
                    <Form.Label>Phone Number</Form.Label>
                  </Form.Group>
                </Col>
              </Row>

              <br></br>

              <Form.Group controlId="username" className="form-floating">
                <Form.Control
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="username"
                />
                <Form.Label>Username</Form.Label>
              </Form.Group>
              <br></br>
              <Form.Group controlId="password" className="form-floating">
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="password"
                  isInvalid={!isPasswordValid}
                />
                {!isPasswordValid && (
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters long.
                  </Form.Control.Feedback>
                )}
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <br></br>
              <Form.Group controlId="confirmPassword" className="form-floating">
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="confirm"
                  isInvalid={!passwordMatch}
                />
                {!passwordMatch && (
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                  </Form.Control.Feedback>
                )}
                <Form.Label>Confirm Password</Form.Label>
              </Form.Group>
              <br></br>

              <Button
                className="d-flex justify-content-center"
                variant="primary"
                type="submit"
                style={{ width: "40%" }}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <h4>Registration Successful!</h4>
          <p>Your registration has been successfully completed.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* error modal*/}
      <Modal
        show={showExistingUserModal}
        onHide={() => setShowExistingUserModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Registration Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Username or email already exists.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setShowExistingUserModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
