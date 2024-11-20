import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "../components/Navigationbar";
import Footer from "../components/Footer";
import Image from "react-bootstrap/Image";
import support from "../Assets/support 2.png";
import EmailUs from "../Assets/Email us-2.png";
import Chat from "../components/Chat";
import "aos/dist/aos.css";
import { Computer , DataTransfer, HandHoldingBox, Target, Diamond, Eye } from 'react-flaticons';
import { Row, Col, Container, Card, Form, Button, Accordion } from "react-bootstrap";
import { MDBTypography } from "mdb-react-ui-kit";
import { LinkContainer } from "react-router-bootstrap";
import "../components/style.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { FaArrowUp, FaEnvelope, FaSpinner } from "react-icons/fa";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import TokenChecker from "../components/TokenChecker";
import { DarkModeContext } from "../components/DarkModeContext";
import Aos from "aos";
import AboutImage  from '../Assets/aboutus.jpg'
function Home() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get("success");
  const [isLoading, setIsLoading] = useState(true);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  useEffect(() => {
    // Apply dark mode style to the body
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const isLoggedIn = TokenChecker !== null && TokenChecker.isLoggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete("success");
        navigate({ search: newSearchParams.toString() });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, location.search, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    Aos.init();
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsMessageLoading(true);
    axios({
      method: "POST",
      url: "https://localhost:7291/api/Email/send",
      data: { Name, Email, Message },
      params: { senderName: "Name", senderEmail: "Email" },
    })
      .then((response) => {
        if (response.data.status === "success") {
          showMessage("success", "Message Sent.");
          resetForm();
        } else if (response.data.status === "fail") {
          showMessage("error", "Message failed to send. Please try again");
        }
        setIsMessageLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        showMessage("error", "An error occurred. Please try again later.");
        setIsMessageLoading(false);
      });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessageText(text);
    setTimeout(() => {
      setMessageType(null);
      setMessageText("");
    }, 5000);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <TokenChecker />
      <Header isLoggedIn={isLoggedIn} />
      <Chat />
      {messageType && (
        <div
          className={`message ${
            messageType === "success" ? "success" : "error"
          }`}
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            zIndex: "9999",
            opacity: "1",
            backgroundColor: messageType === "success" ? "#66bb6a" : "#ef5350",
            color: "#ffffff",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {messageText}
        </div>
      )}
      <div
        className={`scroll-to-top ${isVisible ? "show" : ""}`}
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </div>
      <Container>
        <Row>
          <Col md="6" className="mt-5 ">
            <Card className={`mt-5 ${isDarkMode ? "card-dark" : ""}`}  border="0">
              <Card.Header style={{ backgroundColor: "#2a72dc" }}>
                <Card.Text>
                  <MDBTypography
                    tag="div"
                    className="display-4 pb-3 mb-2"
                    style={{ fontWeight: "bold", color: "#FFFFFF" }}
                  >
                    Get in touch <br></br> with Us
                  </MDBTypography>
                </Card.Text>
              </Card.Header>
              <Card.Body>
                <MDBTypography className="lead mb-0">
                  DAFTech's Social ICT Solution takes great pride in providing
                  exceptional customer support to its clients. We understand
                  that reliable and efficient customer support is essential for
                  businesses relying on our social ICT services. Our dedicated
                  support team is committed to delivering prompt and
                  personalized assistance to address any technical issues or
                  queries that may arise.
                </MDBTypography>
                {!isLoggedIn ? (
                  <LinkContainer to="/Register">
                    <MDBBtn className="mt-4 mb-3">Get Started</MDBBtn>
                  </LinkContainer>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Image src={support} alt="helper man" loading="lazy" className={` ${isDarkMode ? "img-dark" : ""}`} fluid />
          </Col>
        </Row>
        <Row className="mb-8">
          <div className="text-center mb-3">
            <h2>About Us</h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-5 ">
            <div className="">
              <img src={AboutImage} alt="Daf Tech Social" className="w-96 h-auto rounded-md shadow-md"/>
            </div>
            <div className="col">
               <MDBTypography className="leading-relaxed text-base text-lg text-justify">
               At Daftech computer engineering, we embody our company slogan of Trust, Excellence, and Global Reach. We prioritize building trust with our customers, ensuring that every interaction is characterized by transparency, reliability, and integrity. Our commitment to excellence drives us to deliver high-quality products and services that meet the highest industry standards. And with our global reach, we source cutting-edge technology and products to meet your evolving needs.
                Choose Faith Import and Trade and embark on a journey built on Trust, Excellence, and Global Reach. Let us empower your business with the best IT solutions, stationary supplies, and maintenance services, tailored to meet your specific needs. Together, we will achieve new heights of success.
               </MDBTypography>
            </div>
          </div>
        </Row>
        <Card className="mt-5 mb-5 border-0" id="desc" >
          <Card.Body >
            <section id="services" class="services-section pt-100 pb-70" >
              <div class="container">
                <div class="section-title text-center mb-6">
                  <h2>Our Services</h2>
                </div>
                <div class="row" style={{letterSpacing:"1px"}} >
                  <div class="col-lg-4 col-md-6" >
                    <div class="single-services-box">
                      <div class="icon flex items-center justify-center">
                        <HandHoldingBox size='32px'/>
                      </div>
                      <h3>IT Consulting</h3>
                      <p>
                        Our IT consulting services include dedicated customer
                        support to assist you in making informed decisions
                        regarding your IT infrastructure. We provide expert
                        guidance on implementing the right technologies and
                        solutions tailored to your business needs.
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 ">
                    <div class="single-services-box">
                      <div class="icon flex items-center justify-center">
                        <DataTransfer size='32px'/>
                      </div>
                      <h3>Network Services</h3>
                      <p >
                        Our network services come with comprehensive customer
                        support, ensuring your network is running efficiently
                        and securely. We offer 24/7 monitoring, troubleshooting,
                        and fast response to any network issues that may arise.
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="single-services-box">
                      <div class="icon  flex items-center justify-center">
                       
                      <Computer  size='32px' />
                      </div>
                      <h3>Software Development</h3>
                      <p v>
                        Our software development services are backed by
                        exceptional customer support. We ensure timely updates,
                        bug fixes, and continuous improvements to deliver
                        high-quality and reliable software solutions to meet
                        your business requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Card.Body>
        </Card>

        <Row className="w-10/12 mx-auto bg-[#dcecfe] my-12 p-8 rounded-md">
          <div className="flex flex-col gap-6 ">
            <div className="flex gap-4 shadow-md bg-white rounded-md">
              <div className="icon w-32 h-32 flex items-center justify-center rounded-md bg-slate-200">
                <Target size="52" />
              </div>
              <div className="w-3/4 flex flex-col justify-center">
                <h2 className="font-bold text-2xl">Our Target</h2>
                <p className="text-base leading-relaxed">Delivering quality solutions and services as a trusted provider in the industry. Delivering quality solutions and services as a trusted provider in the industry.</p>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4 shadow-md bg-white rounded-md">
              <div className="icon w-32 h-32 flex items-center justify-center rounded-md bg-slate-200">
                <Eye size="45"/>
              </div>
              <div className="w-3/4 flex flex-col justify-center">
                <h2 className="font-bold text-2xl">Our Vision</h2>
                <p className="text-base leading-relaxed">Ensuring 100% customer satisfaction through affordable, top-quality products and services. Ensuring 100% customer satisfaction through affordable, top-quality products and services.</p>
              </div>
            </div>
            <div className="flex gap-4 shadow-md bg-white rounded-md">
              <div className="icon w-32 h-32 flex items-center justify-center rounded-md bg-slate-200">
                <Diamond size="45" />
              </div>
              <div className="w-3/4 flex flex-col justify-center">
                <h2 className="font-bold text-2xl">Our Values</h2>
                <p className="text-base leading-relaxed">Quality | Reliability | Customer Satisfaction | Integriy | Continious Improvment Quality | Reliability | Customer Satisfaction | Integriy | Continious Improvment</p>
              </div>
            </div>
          </div>
        </Row>
        <Card
          id="contact"
          className=" mb-5 mt-4 border-0 d-flex justify-content-center "
        >
          <Card.Header>
            <MDBTypography className="lead display-5 fw-bold mt-3 text-center">
              Contact Us
            </MDBTypography>
          </Card.Header>
          <Card.Body >
            <Row>
              <Col md="6">
                <Image
                  src={EmailUs}
                  alt="send mail"
                  loading="lazy"
                  fluid
                  className="w-75 h-100 mx-5"
                />
              </Col>
              <Col md="6">
                <Form onSubmit={handleSubmit} className="mt-5">
                  <Form.Group controlId="formName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formMessage">
                    <Form.Label>Message:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={Message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br></br>
                  <Button className="flex py-2 px-8" variant="primary" type="submit" disabled={isMessageLoading}>
                    {isMessageLoading ? (
                      <span className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" /> <span>Sending...</span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaEnvelope className="mr-3 mb-1" /> <span>Send</span>
                      </span>
                    )}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="mx-auto flex gap-4 flex-col lg:flex-row mb-8 w-11/12">
          <div className="flex flex-col justify-center gap-4 px-10 py-2 shadow-xl hover:shadow-2xl transition bg-slate-50 w-4/12 min-h-[175px] rounded-md">
            <div className="mx-auto">
            <i className="fa-solid fa-mobile-screen-button text-5xl"></i>
            </div>
            <div className="">
              <p className="text-center text-lg flex flex-col"><span>+25190938943</span><span>+25178563429</span></p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 px-10 py-2 shadow-xl hover:shadow-2xl transition bg-[#417bfe] w-4/12 min-h-[175px]  rounded-md">
            <div className="mx-auto">
            <i class="fa-solid fa-location-dot  text-5xl text-white"></i>
            </div>
            <div className="content">
              <p className="text-center text-lg text-white">Urael Glory Building, 7th Floor, Addis Abeba, Ethiopia</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 px-10 py-2 shadow-xl hover:shadow-2xl transition bg-slate-50 w-4/12 min-h-[175px] rounded-md">
            <div className="mx-auto">
            <i class="fa-solid fa-envelope text-5xl"></i>
            </div>
            <div className="content">
              <p  className="text-center text-lg">office@daftech.com</p>
            </div>
          </div>
        </div>
        <MDBTypography
          className="display-5 pb-3 mb-2"
          style={{ fontWeight: "bold" }}
        >
          Our Location
        </MDBTypography>
        <Card className="mb-3 g-0 shadow-none">
          <Row>
            <Col className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.555212731561!2d38.77132227488381!3d9.013009891047675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85a18f10966b%3A0x8039a6403da8427e!2sGlory%20Building!5e0!3m2!1sen!2set!4v1689753439124!5m2!1sen!2set"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                className="map"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
          </Row>
        </Card>
        {successMessage && (
          <div
            className="message success"
            style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              zIndex: "9999",
              opacity: "1",
              backgroundColor: "#66bb6a",
              color: "#ffffff",
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            Login successful! Welcome back.
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
