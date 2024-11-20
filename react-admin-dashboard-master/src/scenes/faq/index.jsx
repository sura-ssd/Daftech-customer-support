import React, { useState, useEffect } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const FAQ = () => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const bgColor = theme.palette.background.paper;
  const borderColor = theme.palette.divider;
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [adminNames, setAdminNames] = useState({});
  const [answerStatus, setAnswerStatus] = useState({});

  useEffect(() => {
    axios
      .get("https://localhost:7291/api/QnA/questions")
      .then((response) => {
        const unanswered = response.data.filter(
          (question) => !question.isAnswered
        );
        setUnansweredQuestions(unanswered);
      })
      .catch((error) => {
        console.error("Error fetching unanswered questions:", error);
      });
  }, []);

  const handleAnswerQuestion = (questionId) => {
    axios
      .post(`https://localhost:7291/api/QnA/answers`, {
        QuestionAnswerId: questionId,
        Answer: answers[questionId] || "",
        AdminName: adminNames[questionId] || "",
      })
      .then(() => {
        setUnansweredQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
        setAnswers((prevAnswers) => {
          const updatedAnswers = { ...prevAnswers };
          delete updatedAnswers[questionId];
          return updatedAnswers;
        });
        setAnswerStatus({ [questionId]: "success" });
        setTimeout(() => {
          setAnswerStatus({ [questionId]: "" });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error answering the question:", error);
        setAnswerStatus({ [questionId]: "failure" });
      });
  };

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <div>
        {unansweredQuestions.map((question) => (
          <Paper
            key={question.id}
            elevation={3}
            style={{
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <Typography
              color={textColor}
              variant="h5"
              style={{ fontWeight: "bold" }}
            >
              {question.question}
            </Typography>
            <Typography
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                fontStyle: "italic",
                color: textColor,
              }}
            >
              {question.isAnswered ? "Answered" : "Unanswered"}
            </Typography>
            <TextField
              label="Admin Name"
              required // Make the field required
              fullWidth
              variant="outlined"
              value={adminNames[question.id] || ""}
              onChange={(e) =>
                setAdminNames({ ...adminNames, [question.id]: e.target.value })
              }
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Your answer"
              required // Make the field required
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={answers[question.id] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [question.id]: e.target.value })
              }
              style={{ marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAnswerQuestion(question.id)}
              style={{ cursor: "pointer" }}
            >
              Answer
            </Button>
            {answerStatus[question.id] === "success" && (
              <Typography
                variant="body1"
                style={{ color: "green", marginTop: "10px" }}
              >
                Answered successfully!
              </Typography>
            )}
            {answerStatus[question.id] === "failure" && (
              <Typography
                variant="body1"
                style={{ color: "red", marginTop: "10px" }}
              >
                Failed to answer.
              </Typography>
            )}
          </Paper>
        ))}
      </div>
    </Box>
  );
};

export default FAQ;
