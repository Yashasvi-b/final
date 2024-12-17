import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import axios from "axios";
import CalendarComponent from "./Calendar";
import { ProgressBar } from "react-bootstrap";

const Profile = () => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [selfCareProgress, setSelfCareProgress] = useState(0); // Progress for self-care challenges
  const [journalEntries, setJournalEntries] = useState([]); // Journal entries

  useEffect(() => {
    if (!email) {
      alert("User not logged in");
      return;
    }

    // Fetch self-care progress
    axios
      .get("http://localhost:5002/api/get-progress", { withCredentials: true })
      .then((response) => {
        const tasks = response.data.tasks || {};
        const completedCount = Object.values(tasks).filter((d) => d.status).length;
        const progressPercentage = (completedCount / 21) * 100;
        setSelfCareProgress(progressPercentage);
      })
      .catch((error) => console.error("Error fetching self-care progress:", error));

    // Fetch journal entries
    axios
      .get("http://localhost:5002/api/journal/entries", { params: { email } })
      .then((response) => {
        const fetchedEntries = response.data.entries || [];
        setJournalEntries(fetchedEntries);
      })
      .catch((error) => console.error("Error fetching journal entries:", error));
  }, [email]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Profile</h2>

      {/* Email Section */}
      <div style={styles.section}>
        <h3 style={styles.subHeader}>Email</h3>
        <p style={styles.info}>{email}</p>
        <LogoutButton />
      </div>

      {/* Self-Care Progress Section */}
      <div style={styles.section}>
        <h3 style={styles.subHeader}>Self-Care Progress</h3>
        <ProgressBar
          now={selfCareProgress}
          label={`${Math.round(selfCareProgress)}%`}
          style={styles.progressBar}
        />
      </div>

      {/* Journal Tracker Section */}
      <div style={styles.section}>
        <h3 style={styles.subHeader}>Journal Tracker</h3>
        <p style={styles.info}>Click on a date to view your journal entries.</p>
        <CalendarComponent
          markedDates={journalEntries.map((entry) => entry.date)} // Dates with journal entries
          onDateClick={(date) => {
            const entriesForDate = journalEntries.filter((entry) => entry.date === date);
            if (entriesForDate.length > 0) {
              alert(
                `Entries for ${date}:\n` +
                  entriesForDate
                    .map((entry) => `${entry.title}: ${entry.content}`)
                    .join("\n\n")
              );
            } else {
              alert("No entries for this date.");
            }
          }}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    color: "#3f51b5",
    maxWidth: "900px",
    margin: "auto",
    textAlign: "center",
  },
  header: {
    color: "#1a237e",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "40px",
  },
  subHeader: {
    fontSize: "1.5rem",
    color: "#3f51b5",
    marginBottom: "10px",
  },
  info: {
    fontSize: "1rem",
    color: "#000",
  },
  progressBar: {
    height: "30px",
  },
};

export default Profile;
