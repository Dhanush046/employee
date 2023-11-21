const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const { log } = require("console");
const app = express();

app.use(express.json());

app.use(cors());

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Your server is running on PORT ", PORT);
});

var db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "dhanush123@cit",
  database: "employee",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to DataBase ", err);
  } else {
    console.log("Connected to DataBase");
  }
});

app.post("/emp", (req, res) => {
    const query = "INSERT INTO details (`name`, `position`, `salary`, `joindate`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.position,
        req.body.salary,
        req.body.joindate,
    ];

    db.query(query, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Successfully Added");
    })
})


app.get('/users', (req, res) => {
  const sql = "SELECT * FROM details";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM details WHERE id = ? ";
  db.query(query, [userId], (err, data) => {
    if(err) return res.send(err);
    return res.json(data);
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "UPDATE details SET `name`= ?, `position`= ?, `salary`= ?, `joindate`= ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.position,
    req.body.salary,
    req.body.joindate,
  ];

  db.query(query, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});