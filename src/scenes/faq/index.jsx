import { Box, useTheme, TextField, Button, IconButton } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Retrieve saved FAQs from local storage on initial load
  const [faqs, setFaqs] = useState(() => {
    const savedFaqs = localStorage.getItem("faqs");
    return savedFaqs
      ? JSON.parse(savedFaqs)
      : [
          {
            question: "An Important Question",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
          {
            question: "Another Important Question",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
        ];
  });

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Save FAQs to local storage whenever the FAQs state changes
  useEffect(() => {
    localStorage.setItem("faqs", JSON.stringify(faqs));
  }, [faqs]);

  const handleAddFAQ = () => {
    if (newQuestion && newAnswer) {
      setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  // Function to handle removing an FAQ
  const handleRemoveFAQ = (indexToRemove) => {
    const updatedFaqs = faqs.filter((_, index) => index !== indexToRemove);
    setFaqs(updatedFaqs);
  };

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      <Box mb="20px">
        <Typography variant="h6" color={colors.greenAccent[500]}>
          Add a New FAQ
        </Typography>
        <Box display="flex" flexDirection="column" gap="10px" mt="10px">
          <TextField
            label="Question"
            variant="outlined"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <TextField
            label="Answer"
            variant="outlined"
            multiline
            rows={4}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFAQ}
            sx={{ alignSelf: "flex-start" }}
          >
            Add FAQ
          </Button>
        </Box>
      </Box>

      {faqs.map((faq, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography color={colors.greenAccent[500]} variant="h5">
                {faq.question}
              </Typography>
              <IconButton onClick={() => handleRemoveFAQ(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
