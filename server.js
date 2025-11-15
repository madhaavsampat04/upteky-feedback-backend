import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// POST Feedback
app.post("/api/feedback", (req, res) => {
  const { name, email, message, rating } = req.body;

  if (!name || !message)
    return res.status(400).json({ error: "Name and message required" });

  const createdAt = new Date().toISOString();

  db.run(
    `INSERT INTO feedbacks (name, email, message, rating, createdAt)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, message, rating, createdAt],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

// GET Feedback
app.get("/api/feedback", (req, res) => {
  db.all("SELECT * FROM feedbacks ORDER BY id DESC", (err, rows) => {
    res.json(rows);
  });
});

// GET Stats
app.get("/api/stats", (req, res) => {
  db.all("SELECT * FROM feedbacks", (err, rows) => {
    const total = rows.length;
    const avg =
      rows.reduce((a, b) => a + b.rating, 0) / (rows.length || 1);
    const positive = rows.filter((x) => x.rating >= 4).length;
    const negative = rows.filter((x) => x.rating <= 2).length;

    res.json({ total, avg, positive, negative });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
