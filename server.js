const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const db = new sqlite3.Database("diary.db");

// TABLES
db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY,
            pin TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS entries(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            content TEXT
        )
    `);

    // DEFAULT PIN (ONLY ON FIRST RUN)
    db.get("SELECT * FROM user", [], (err, row) => {
        if (!row) {
            db.run("INSERT INTO user(pin) VALUES(?)", ["1234"]);
        }
    });

});

// LOGIN ONLY
app.post("/login", (req, res) => {

    const { pin } = req.body;

    db.get(
        "SELECT * FROM user WHERE pin=?",
        [pin],
        (err, row) => {

            if (row) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }

        }
    );

});

// GET ENTRIES
app.get("/entries", (req, res) => {

    db.all(
        "SELECT * FROM entries ORDER BY id DESC",
        [],
        (err, rows) => {
            res.json(rows);
        }
    );

});

// REGISTER (CREATE PIN)
app.post("/register", (req, res) => {

    const { pin } = req.body;

    db.run(
        "UPDATE user SET pin=?",
        [pin],
        function (err) {
            if (err) {
                res.json({ success: false, message: "Error creating PIN" });
            } else {
                res.json({ success: true });
            }
        }
    );

});

// SAVE ENTRY
app.post("/entries", (req, res) => {

    const { date, content } = req.body;

    db.run(
        "INSERT INTO entries(date, content) VALUES(?,?)",
        [date, content],
        function () {
            res.json({ success: true });
        }
    );

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});