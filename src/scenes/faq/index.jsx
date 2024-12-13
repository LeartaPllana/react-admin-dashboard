import { Box, useTheme, TextField, Button } from "@mui/material";
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

  // Load FAQs from localStorage
  const loadFAQs = () => {
    const savedFAQs = localStorage.getItem("faqs");
    return savedFAQs ? JSON.parse(savedFAQs) : [];
  };

  const [faqs, setFaqs] = useState(loadFAQs);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Save FAQs to localStorage whenever the FAQs state changes
  useEffect(() => {
    localStorage.setItem("faqs", JSON.stringify(faqs));
  }, [faqs]);

  const handleAddFAQ = () => {
    if (newQuestion && newAnswer) {
      const updatedFAQs = [...faqs, { question: newQuestion, answer: newAnswer }];
      setFaqs(updatedFAQs);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const handleDeleteFAQ = (index) => {
    const updatedFAQs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFAQs);
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
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography color={colors.greenAccent[500]} variant="h5" sx={{ flexGrow: 1 }}>
              {faq.question}
            </Typography>
            <DeleteIcon
              sx={{ cursor: "pointer", color: "red" }}
              onClick={() => handleDeleteFAQ(index)}
            />
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
