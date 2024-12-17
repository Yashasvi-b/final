import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FormatBoldIcon from "@mui/icons-material/FormatBold"; // Changed Icon
import LabelIcon from "@mui/icons-material/Label";
import axios from "axios";

const JournalPage = () => {
  const [selectedJournal, setSelectedJournal] = useState("morning");
  const [entries, setEntries] = useState({ morning: [], daily: [], weekly: [], gratitude: [] });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formResponses, setFormResponses] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewEntry, setViewEntry] = useState(null);
  const [starred, setStarred] = useState(false); // Track starred status
  const [emoji, setEmoji] = useState("😊");
  const [isBold, setIsBold] = useState(false); // New state for bold formatting
  const [label, setLabel] = useState("");

  const journalPrompts = {
    morning: ["How are you feeling this morning?","What is your main focus for today?",
         ],
    daily: ["Describe your day:"],
    weekly: ["What went well this week?", "What challenges did you face?",],
    gratitude: ["List three things you're grateful for today.",
    "What strengths or qualities of yours are you thankful for?",
      ],
  };

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      alert("User not logged in");
      return;
    }
    axios
      .get("http://localhost:5002/api/journal/entries", { params: { email } })
      .then((response) => setEntries(response.data.entries || {}))
      .catch((error) => console.error("Error fetching entries:", error));
  }, [email]);

  const handleJournalSelect = (journalType) => {
    setSelectedJournal(journalType);
    setViewEntry(null);
    setStarred(false);
    setEmoji("😊");
    setLabel("");
    setIsBold(false);
    setFormResponses({});
  };

  const handleInputChange = (index, value) => {
    setFormResponses({ ...formResponses, [index]: value });
  };

  const handleSaveEntry = () => {
    if (Object.values(formResponses).every((response) => !response.trim())) return;

    const newEntry = {
      email,
      journalType: selectedJournal,
      title: label ? label : `Entry on ${new Date().toLocaleDateString()}`, // Swap label and title
      label: `Entry on ${new Date().toLocaleDateString()}`, // Assign date to label
      content: formResponses,
      date: new Date().toLocaleString(),
      isStarred: starred,
      emoji,
    };

    axios
      .post("http://localhost:5002/api/journal/save", newEntry)
      .then(() => {
        setEntries({
          ...entries,
          [selectedJournal]: [...(entries[selectedJournal] || []), newEntry],
        });
        setFormResponses({});
        alert("Journal entry saved!");
      })
      .catch((error) => console.error("Error saving entry:", error));
  };

  const toggleStar = () => setStarred(!starred);
  const toggleBold = () => setIsBold(!isBold);

  const handleEmojiChange = () => {
    const emojis = ["😊", "😢", "😠", "😌", "😱"];
    const index = emojis.indexOf(emoji);
    setEmoji(emojis[(index + 1) % emojis.length]);
  };

  const handleLabelChange = () => {
    const newLabel = prompt("Enter a title for your journal:");
    if (newLabel) setLabel(newLabel);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to bottom, #a1c4fd, #c2e9fb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "800px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" align="center" style={{ marginBottom: "20px", color: "#4e54c8" ,fontWeight:"bold",fontSize:"2rem"}}>
          My Journals
        </Typography>

        {/* Journal Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          {Object.keys(journalPrompts).map((journalType) => (
            <Button
              key={journalType}
              variant={selectedJournal === journalType ? "contained" : "outlined"}
              onClick={() => handleJournalSelect(journalType)}
              style={{
                backgroundColor: selectedJournal === journalType ? "#4e54c8" : "transparent",
                color: selectedJournal === journalType ? "#fff" : "#4e54c8",
                borderRadius: "8px",
              }}
            >
              {`${journalType.charAt(0).toUpperCase() + journalType.slice(1)} Journal`}
            </Button>
          ))}
        </div>

        {/* Journal Content */}
        {viewEntry ? (
          <Card style={{ borderRadius: "8px", padding: "15px" }}>
            <IconButton onClick={() => setViewEntry(null)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" style={{ color: "#4e54c8", marginBottom: "10px" }}>
              {viewEntry.title}
              {viewEntry.emoji && (
                <span style={{ marginLeft: "10px", fontSize: "1.5rem" }}>{viewEntry.emoji}</span>
              )}
            </Typography>
            {viewEntry.label && (
              <Typography variant="subtitle1" style={{ color: "#6a82fb" }}>
                {viewEntry.label}
              </Typography>
            )}
            <Typography variant="subtitle2" color="textSecondary">
              {viewEntry.date}
            </Typography>
            {Object.values(viewEntry.content).map((content, index) => (
              <Typography key={index} style={{ fontWeight: isBold ? "bold" : "normal", marginTop: "10px" }}>
                {content}
              </Typography>
            ))}
          </Card>
        ) : (
          <>
            {journalPrompts[selectedJournal].map((prompt, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
                <Typography
                  variant="body1"
                  style={{
                    color: "#4e54c8",
                    fontWeight:  "normal",
                    fontSize: isBold ? "1.1rem" : "1rem",
                  }}
                >
                  {prompt}
                </Typography>
                <TextField
  multiline
  rows={3}
  fullWidth
  value={formResponses[index] || ""}
  onChange={(e) => handleInputChange(index, e.target.value)}
  variant="outlined"
  inputProps={{
    style: {
      fontWeight: isBold ? "bold" : "normal", // Apply bold styling only to the input text
    },
  }}
/>

              </div>
            ))}

            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px" }}>
              <IconButton onClick={toggleStar}>{starred ? <StarIcon /> : <StarBorderIcon />}</IconButton>
              <IconButton onClick={handleEmojiChange}>
                <Typography>{emoji}</Typography>
              </IconButton>
              <IconButton onClick={toggleBold}>
                <FormatBoldIcon />
              </IconButton>
              <IconButton onClick={handleLabelChange}>
                <LabelIcon />
              </IconButton>
            </div>

            {/* Save/View Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#4e54c8", color: "white", flex: 1 }}
                onClick={handleSaveEntry}
              >
                Save Entry
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#6a82fb", color: "white", flex: 1 }}
                onClick={() => setDrawerOpen(true)}
              >
                View Saved Entries
              </Button>
            </div>
          </>
        )}

        {/* Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div style={{ width: "300px", padding: "20px", backgroundColor: "#f8f9fa" }}>
            <Typography variant="h6" style={{ color: "#4e54c8", marginBottom: "15px" }}>
              Saved Entries
            </Typography>
            <List>
              {entries[selectedJournal]?.map((entry, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    setViewEntry(entry);
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemText
                    primary={
                      <>
                        {entry.title}
                        {entry.isStarred && <StarIcon style={{ color: "#FFD700", marginLeft: "5px" }} />}
                      </>
                    }
                    secondary={entry.label}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default JournalPage;
