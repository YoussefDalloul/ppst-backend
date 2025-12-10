const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// TEMP in-memory store (later we connect Microsoft To Do)
let reminders = [];

// ========== Add Reminder ==========
app.post("/add-reminder", (req, res) => {
    const { employeeID, employeeName, returnDate, type } = req.body;

    if (!employeeID || !employeeName || !returnDate || !type) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const reminder = {
        id: uuidv4(),
        employeeID,
        employeeName,
        returnDate,
        type
    };

    reminders.push(reminder);

    return res.json({ success: true, reminder });
});

// ========== Get All Reminders ==========
app.get("/reminders", (req, res) => {
    res.json(reminders);
});

// ========== Health Check for Render ==========
app.get("/", (req, res) => {
    res.send("Backend is running ✔️");
});

// ========== Start Server (Render compatible) ==========
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
