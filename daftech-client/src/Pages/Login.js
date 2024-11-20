import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { FaSpinner } from "react-icons/fa";
import { Card, Form, Button, Alert, Container, Row, Col, Image } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import Login from "../Assets/Login.jpg";
import Logo from "../Assets/Logo.jpg";

function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
  
    try {
      await login(username, password);
      window.location.href = "/?success=1"; // Redirect on successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const goToHomepage = () => {
    window.location.href = "/"; 
  };


  return (
    <div>
      <Container className="d-flex justify-content-center mt-5">
        <Card
          border="0"
          style={{ borderRadius: "1rem" }}
          className="card w-75 h-50 mt-5"
        >
          <Row className="g-0">
            <Col md="5" className="mt-5">
              <Image src={Login} alt="helper man" loading="lazy" fluid />
            </Col>

            <Col md="7" className="p-3">
              <Card.Body>
                <div className="d-flex justify-content-center flex-row mt-2">
                  <Image src={Logo} alt="logo"></Image>
                </div>

                <h5
                  className="fw-normal my-4 pb-3 text-center"
                  style={{ letterSpacing: "1px" }}
                >
                  Login to your account
                </h5>

                <Form
                  onSubmit={handleSubmit}
                  className=" justify-content-center pb-1"
                >
                  <Form.Group controlId="username" className="form-floating">
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Label>Username</Form.Label>
                  </Form.Group>
                  <br />
                  <Form.Group controlId="password" className="form-floating">
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Label>Password</Form.Label>
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn btn-block"
                    style={{ width: "100%" }}
                    disabled={isLoggingIn} // Disable the button while logging in
                  >
                    {isLoggingIn ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" /> Logging In...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </Button>

                  {error && (
                    <Alert variant="danger" className="mt-3 text-center">
                      {error}
                    </Alert>
                  )}

                  <Alert variant="info" className="mt-3 text-center">
                    Don't have an account? Sign up <a href="/Register">here</a>.
                  </Alert>

                  <Button
                    variant="secondary"
                    className="mt-3"
                    onClick={goToHomepage}
                  >
                    Back to Homepage
                  </Button>
                </Form>
                <div>
                  &copy; {new Date().getFullYear()} Copyright: DafTech
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default LoginForm;
