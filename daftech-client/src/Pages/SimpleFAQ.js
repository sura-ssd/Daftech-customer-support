import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Header from "../components/Navigationbar";
import Footer from "../components/Footer";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icon components
import "../../src/components/style.css";
import faqImage from "../Assets/FAQ Image.jpg";

const SimpleFAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const userId = localStorage.getItem("userId");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    fetchQuestions();
  }, [currentPage]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("https://localhost:7291/api/QnA/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const formatDateTime = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const handlePostQuestion = async () => {
    if (!newQuestion.trim()) return;

    try {
      await axios.post("https://localhost:7291/api/QnA/questions", {
        clientId: userId,
        question: newQuestion,
      });

      setNewQuestion("");
      fetchQuestions();
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error("Error posting question:", error);
      setErrorMessage("Error posting the question. Please try again.");
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (questions.length > currentPage * questionsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div>
      <Header />
      <img src={faqImage} alt="FAQ" className="faq-image" />

      <div className="faq-container">
        <h1 className="faq-heading">Frequently Asked Questions</h1>

        <div className="faq-list">
          {currentQuestions.map((question) => (
            <Card key={question.id} className="faq-card m-3 shadow-sm">
              <Card.Body>
                <Card.Title className="faq-card-title">
                  {question.question}
                </Card.Title>
                {question.isAnswered ? (
                  <div>
                    <Card.Text className="faq-card-answer">
                      <strong>Answer:</strong> {question.answer}
                    </Card.Text>
                    <Card.Text className="faq-card-text">
                      <strong>Posted Date:</strong> {formatDateTime(question.timestamp)}
                    </Card.Text>
                    {question.answeredTimestamp && (
                      <Card.Text className="faq-card-text">
                        <strong>Answered Date:</strong> {formatDateTime(question.answeredTimestamp)}
                      </Card.Text>
                    )}
                    <Card.Text className="faq-card-status answered">
                      Answered
                    </Card.Text>
                  </div>
                ) : (
                  <div>
                    <Card.Text className="faq-card-text">
                      <strong>Posted Date:</strong> {formatDateTime(question.timestamp)}
                    </Card.Text>
                    <Card.Text className="faq-card-status unanswered">
                      Unanswered
                    </Card.Text>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>

        {questions.length > 0 && (
          <div className="pagination d-flex justify-content-center">
            <button
              className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <button
              className={`pagination-button ${questions.length <= currentPage * questionsPerPage ? "disabled" : ""}`}
              onClick={goToNextPage}
              disabled={questions.length <= currentPage * questionsPerPage}
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        <Form className="mt-4">
          <Form.Group controlId="newQuestion">
            <Form.Label className="faq-form-label">Post a new question:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="faq-textarea"
            />
          </Form.Group>
          <button className="btn btn-primary mt-3" onClick={handlePostQuestion}>
            Post Question
          </button>
        </Form>
      </div>

      <Footer />

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className={`notification ${showNotification ? "show" : ""}`}>
        Question posted!
      </div>
    </div>
  );
};

export default SimpleFAQ;
