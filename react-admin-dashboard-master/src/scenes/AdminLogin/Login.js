import React, { useState, useEffect } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import './Login.css'

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false); // Control loading screen visibility
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate()
  const location = useLocation()
  const queryString = location.search || '/';
  const params = new URLSearchParams(queryString);
  const redirectTo = params.get('redirectTo') || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setShowLoadingScreen(true); // Show loading screen when logging in

    // Ensure the loading screen is shown for a minimum duration (e.g., 1 second)
    setTimeout(async () => {
      const result = await dispatch(loginUser({ username, password }, navigate));

      if (result.payload) {
        navigate(redirectTo);
      } else {
        console.error("Login failed:", result.error);
      }

      setIsLoggingIn(false);
      setShowLoadingScreen(false); // Hide loading screen when login operation is complete
    }, 2000); // 1000 milliseconds (1 second)
  };

  return (
    <MDBContainer fluid className="my-5">
      <MDBRow className="g-0 align-items-center">
        <MDBCol col="6">
          <MDBCard
            className="my-5  border-0 shadow"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
              zIndex: 18582,
            }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign in</h2>

              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="form3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn className=" login-btn w-50 mb-4 p-2" onClick={handleLogin} disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Sign in'}
              </MDBBtn>
              {error && <div className="text-danger">{error}</div>} 
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col="6">
          <img
            src={`../../assets/Adminlog.jpg`}
            className="w-100 rounded-4 shadow-4"
            alt=""
            fluid
            style={{ height: "680px" }}
          />
        </MDBCol>
      </MDBRow>
      {showLoadingScreen && <LoadingScreen />}
    </MDBContainer>
  );
}

export default LoginForm;
