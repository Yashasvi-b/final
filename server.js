const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const User2 = require('./models/User2');
const JournalModel = require('./models/Journal');
const UserStory=require('./models/Userstory');


dotenv.config();

const app = express();
const PORT = 5002;
const JWT_SECRET = "San25871@1234"; // Use a secure key for signing JWTs

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Update origin for your frontend
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Helper Function: Generate JWT
const generateToken = (email) => jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

// Middleware: Extract Email from Token
const extractEmail = (req, res, next) => {
  const token = req.cookies?.authToken; // Safely access cookies
  if (!token) {
    console.error("Auth token missing in request cookies");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    req.email = email; // Attach email to request object
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Route: Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { email, pd } = req.body;

    if (!email || !pd) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const SALT = 'fhgy45f';
    const passwordEncrypted = crypto.createHash('sha1').update(pd + SALT).digest('hex');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, pd: passwordEncrypted });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Route: Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, pd } = req.body;

    if (!email || !pd) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const SALT = 'fhgy45f';
    const passwordEncrypted = crypto.createHash('sha1').update(pd + SALT).digest('hex');

    const user = await User.findOne({ email, pd: passwordEncrypted });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(email);
    res.cookie("authToken", token, { httpOnly: true, secure: false });
    // Set the token as an HTTP-only cookie
    res.status(200).json({ message: 'Login successful', email });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Route: Get Progress
app.get('/api/get-progress', extractEmail, async (req, res) => {
  const { email } = req;
  try {
    const user = await User2.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ tasks: user.tasks || {} });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

// Route: Save Progress
app.post('/api/save-progress', extractEmail, async (req, res) => {
  const { email } = req;
  const { tasks } = req.body;

  try {
    const result = await User2.updateOne(
      { email },
      { $set: { tasks } },
      { upsert: true } // Create a new document if it doesn't exist
    );

    console.log('Database update result:', result);
    res.json({ message: 'Progress saved successfully' });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ message: 'Error saving progress' });
  }
});



app.post("/api/journal/save", async (req, res) => {
  const { email, journalType, title, content, date } = req.body;

  if (!email || !journalType || !title || !content || !date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Ensure journalType is valid
    const validTypes = ["morning", "daily", "weekly", "gratitude"];
    if (!validTypes.includes(journalType)) {
      return res.status(400).json({ message: "Invalid journal type." });
    }

    // Save or update the entry
    const result = await JournalModel.updateOne(
      { email },
      { $push: { entries: { journalType, title, content, date } } },
      { upsert: true }
    );

    res.status(200).json({ message: "Journal entry saved successfully!" });
  } catch (error) {
    console.error("Error saving journal entry:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});



// app.get("/api/journal/entries", async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required." });
//   }

//   try {
//     const journals = await JournalModel.findOne({ email });
//     res.status(200).json({ entries: journals?.entries || [] });
//   } catch (error) {
//     console.error("Error fetching journal entries:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });


app.get("/api/journal/entries", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const journals = await JournalModel.findOne({ email });

    if (!journals) {
      return res.status(404).json({ message: "No journal entries found." });
    }

    // Send the entries grouped by journalType
    const groupedEntries = {
      morning: [],
      daily: [],
      weekly: [],
      gratitude: [],
    };

    journals.entries.forEach((entry) => {
      if (entry.journalType && groupedEntries[entry.journalType]) {
        groupedEntries[entry.journalType].push(entry);
      }
    });

    res.status(200).json({ entries: groupedEntries });
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("authToken"); // Clear the cookie
  res.status(200).json({ message: "Logged out successfully" });
});


const { exec } = require("child_process");

app.post("/api/recommend", (req, res) => {
    const { sentence } = req.body;

    if (!sentence) {
        return res.status(400).json({ error: "Sentence is required" });
    }

    const pythonPath = "C:/Users/Sona/AppData/Local/Programs/Python/Python312/python.exe"; // Adjust path as needed
    const escapedSentence = sentence.replace(/"/g, '\\"');

    exec(
        `${pythonPath} sentiment_model.py "${escapedSentence}"`,
        { timeout: 120000 },
        (error, stdout, stderr) => {
            if (error) {
                console.error("Error:", error);
                return res.status(500).json({ error: "Error running the Python script" });
            }

            try {
                // Extract only the JSON part from stdout
                const jsonStart = stdout.indexOf('{');
                const jsonEnd = stdout.lastIndexOf('}') + 1;
                const jsonString = stdout.substring(jsonStart, jsonEnd);

                const response = JSON.parse(jsonString); // Parse the JSON
                res.json(response);
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError, "Raw output:", stdout);
                res.status(500).json({ error: "Error parsing Python script output" });
            }
        }
    );
});


// app.post("/api/submit-story", async (req, res) => {
//   const { email, age, gender, issue, content } = req.body;

//   if (!email || !issue || !content) {
//     return res.status(400).json({ message: "Email, issue, and content are required" });
//   }

//   try {
//     const newStory = new UserStory({
//       email,
//       age,
//       gender,
//       issue,
//       content,
//     });

//     await newStory.save();  // Save the new story to the database
//     res.status(200).json({ message: "Story submitted successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error submitting story." });
//   }
// });



// // Route to fetch all user stories based on filters
// app.get("/api/stories", async (req, res) => {
//   const { issue, gender, age } = req.query;
//   const filter = {};

//   if (issue) filter.issue = issue;
//   if (gender) filter.gender = gender;
//   if (age) filter.age = { $gte: parseInt(age) };

//   try {
//     const stories = await UserStory.find(filter);
//     res.status(200).json(stories);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching stories." });
//   }
// });

// Route to submit a story with dynamic email from JWT
app.post("/api/submit-story", authenticateToken, async (req, res) => {
  const { age, gender, issue, content } = req.body;

  // Extract email dynamically from the authenticated user
  const email = req.user.email;

  if (!email || !issue || !content) {
    return res.status(400).json({ message: "Email, issue, and content are required" });
  }

  try {
    const newStory = new UserStory({
      email,
      age,
      gender,
      issue,
      content,
    });

    await newStory.save(); // Save to database
    res.status(200).json({ message: "Story submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting story." });
  }
});

// Route to fetch all user stories based on filters
app.get("/api/stories", async (req, res) => {
  const { issue, gender, age } = req.query;
  const filter = {};

  if (issue) filter.issue = issue;
  if (gender) filter.gender = gender;
  if (age) filter.age = { $gte: parseInt(age) };

  try {
    const stories = await UserStory.find(filter);
    res.status(200).json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stories." });
  }
});


// Increment likes for a story
app.post('/api/stories/:id/like', async (req, res) => {
  const { id } = req.params; // Extract story ID from URL
  try {
    const story = await UserStory.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // Increment the likes field
      { new: true } // Return the updated document
    );
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.status(200).json({ likes: story.likes }); // Return updated likes count
  } catch (error) {
    console.error('Error liking story:', error);
    res.status(500).json({ message: 'Error liking story' });
  }
});



app.post("/api/analyze-story", (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Story content is required" });
    }

    const pythonPath = "C:/Users/Sona/AppData/Local/Programs/Python/Python312/python.exe"; // Update to your Python path
    exec(
        `${pythonPath} suicide_detection.py "${content}"`,
        { timeout: 120000 },
        (error, stdout, stderr) => {
          if (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: "Error running the Python script" });
        }

        try {
            // Extract only the JSON part from stdout
            const jsonStart = stdout.indexOf('{');
            const jsonEnd = stdout.lastIndexOf('}') + 1;
            const jsonString = stdout.substring(jsonStart, jsonEnd);

            const response = JSON.parse(jsonString); // Parse the JSON
            res.json(response);
            } catch (parseError) {
                console.error("Error parsing Python output:", parseError, "Raw output:", stdout);
                res.status(500).json({ error: "Error parsing analysis result" });
            }
        }
    );
});

// Chatbot API Endpoint
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;

  if (!message) {
      return res.status(400).send("Message is required");
  }

  const pythonPath = "C:/Users/Sona/AppData/Local/Programs/Python/Python312/python.exe"; // Update the Python path
  const scriptPath = "new.py"; // Path to your chatbot script

  // Execute the Python script with user input
  exec(`${pythonPath} ${scriptPath} "${message}"`, (error, stdout, stderr) => {
      if (error) {
          console.error('Error running chatbot:', error);
          return res.status(500).send("Error running chatbot.");
      }

      // Send chatbot response as-is
      res.send(stdout.trim());
  });
});


// Root Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
