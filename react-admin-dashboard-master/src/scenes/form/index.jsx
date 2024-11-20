import React, { Component } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import Header from "../../components/Header";

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      role: "",
      username: "",
      password: "",
      selectedImage: null,
      confirmPassword: "",
      passwordMatchError: false,
      registrationStatus: null,
    };
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordMatchError: true });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profileImage", this.state.selectedImage);
      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("email", this.state.email);
      formData.append("phoneNumber", this.state.contact);
      formData.append("role", this.state.role);
      formData.append("username", this.state.username);
      formData.append("password", this.state.password);

      const response = await axios.post(
        "https://localhost:7291/api/Admin/AddAdmin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      this.setState({
        registrationStatus: "success",
        passwordMatchError: false,
      });

      setTimeout(() => {
        this.setState({ registrationStatus: null });
      }, 3000);
    } catch (error) {
      console.error("Error registering admin:", error);
      this.setState({
        registrationStatus: "error", // Set registration error status
      });

      // Clear registration status after 3 seconds
      setTimeout(() => {
        this.setState({ registrationStatus: null });
      }, 3000);
    }
  };

  handleImageChange = (e) => {
    this.setState({ selectedImage: e.target.files[0] });
  };
  render() {
    return (
      <div className="App bg-gray-100 min-h-screen">
        <Header title="CREATE Admin" subtitle="Create a New Admin Profile" />
        <Container className="py-8">
          {this.state.registrationStatus === "success" && (
            <div className="text-success text-right mb-3 fade-out">
              Admin registered successfully!
            </div>
          )}
          {this.state.registrationStatus === "error" && (
            <div className="text-danger text-right mb-3 fade-out">
              Error registering admin. Please try again.
            </div>
          )}
          <Card className="p-4 border-0 shadow me-3 ">
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.firstName}
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.lastName}
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={this.state.role}
                  onChange={(e) => this.setState({ role: e.target.value })}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">manager</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.contact}
                  onChange={(e) => this.setState({ contact: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                  required
                  isInvalid={this.state.passwordMatchError}
                />
                {this.state.passwordMatchError && (
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="profileImage" className="mb-3">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={this.handleImageChange}
                />
              </Form.Group>

              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-100"
              >
                Create New Admin
              </Button>
            </Form>
          </Card>
        </Container>
      </div>
    );
  }
}

export default AdminForm;
