const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, "data", "users.json");

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Redirect the root URL to the signup page
app.get("/", (req, res) => {
    res.redirect("/signup.html");
});

// Helper function to read user data from JSON file
function readUserData() {
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

// Helper function to write user data to JSON file
function writeUserData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Signup endpoint
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    let users = readUserData();

    // Check if the username already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Add new user to users array
    users.push({ username, password });
    writeUserData(users);
    res.json({ message: "Signup successful" });
});

// Login endpoint
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = readUserData();

    // Check if user exists and password matches
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({ message: `Welcome, ${username}!`, username });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
