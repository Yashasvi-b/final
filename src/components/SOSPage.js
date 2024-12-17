import React, { useState } from "react";
import axios from "axios";
import "./SOSPage.css";

const SOSPage = () => {
  const userId = "user1"; // Replace with dynamic user IDs
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ name: "", email: "" });
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Add a new contact
  const addContact = () => {
    if (contact.name && contact.email) {
      setContacts([...contacts, contact]);
      setContact({ name: "", email: "" });
    }
  };

  // Save contacts to the backend
  const saveContacts = async () => {
    try {
      await axios.post("http://localhost:5000/saveContacts", {
        userId,
        contacts,
      });
      setIsSetupComplete(true);
      alert("Contacts saved successfully!");
    } catch (error) {
      console.error("Error saving contacts:", error);
    }
  };

  // Trigger SOS
  const triggerSOS = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        try {
          await axios.post("http://localhost:5000/triggerSOS", {
            userId,
            location,
          });
          alert("SOS triggered successfully!");
        } catch (error) {
          console.error("Error triggering SOS:", error);
        }
      },
      (error) => {
        alert("Unable to get location. Ensure location services are enabled.");
      }
    );
  };

  return (
    <div className="sos-container">
      {!isSetupComplete ? (
        <div className="setup-container">
          <h2>Set Up Emergency Contacts</h2>
          <input
            type="text"
            placeholder="Contact Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Contact Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
          <button onClick={addContact} style={{
  padding: "10px 20px",
  margin: "10px",
  border: "none",
  borderRadius: "5px",
  color: "white",
  backgroundColor: "#d9534f",
  cursor: "pointer",
}}>Add Contact</button>
          <ul>
            {contacts.map((c, index) => (
              <li key={index}>{`${c.name} (${c.email})`}</li>
            ))}
          </ul>
          <button onClick={saveContacts}>Save Contacts</button>
        </div>
      ) : (
        <div className="sos-trigger">
          <h2>Emergency SOS</h2>
          <button className="sos-button" onClick={triggerSOS}>
            Send SOS
          </button>
        </div>
      )}
    </div>
  );
};

export default SOSPage;
