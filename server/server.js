import express from "express";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: "http://localhost:5500", // adjust to your frontend port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// MySQL setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "letustry1",
  database: "skillswap"
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username=?", [username], async (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });
    
    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(401).json({ error: "Wrong password" });
    
    // ✅ Set cookie if login success
    res.cookie("loggedIn", "true", {
      httpOnly: true,
      secure: false,  // change to true if using HTTPS
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60 // 1 hour
    });
    res.cookie("username", username, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60
    });
    res.json({ message: "Login success" });
  });
});

app.get("/check-login", (req, res) => {
  const loggedIn = req.cookies.loggedIn === "true";
  if (loggedIn) res.json({ loggedIn: true, user: req.cookies.username });
  else res.status(401).json({ loggedIn: false });
});

app.post("/logout", (req, res) => {
  res.clearCookie("loggedIn");
  res.clearCookie("username");
  res.json({ message: "Logged out" });
});

// REGISTER ROUTE
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  db.query("SELECT * FROM users WHERE username=?", [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0) return res.status(400).json({ error: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashed],
      (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "User registered successfully" });
      }
    );
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

