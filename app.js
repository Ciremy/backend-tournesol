const express = require("express");
const db = require("./db");
const app = express();
const port = 6000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get("/user", async (req, res) => {
  try {
    const result = await db.pool.query("select * from user");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/admin", async (req, res) => {
  try {
    const result = await db.pool.query("select * from user where is_admin = 1");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/company", async (req, res) => {
  try {
    const result = await db.pool.query("select * from company");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/product", async (req, res) => {
  console.log(req.query.company_id);
  try {
    const result = await db.pool.query(
      `SELECT * FROM product WHERE comany_id = "${req.query.company_id}"`
    );
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// POST
// app.post("/tasks", async (req, res) => {
//   let task = req.body;
//   try {
//     const result = await db.pool.query(
//       "insert into tasks (description) values (?)",
//       [task.description]
//     );
//     res.send(result);
//   } catch (err) {
//     throw err;
//   }
// });

// app.put("/tasks", async (req, res) => {
//   let task = req.body;
//   try {
//     const result = await db.pool.query(
//       "update tasks set description = ?, completed = ? where id = ?",
//       [task.description, task.completed, task.id]
//     );
//     res.send(result);
//   } catch (err) {
//     throw err;
//   }
// });

// app.delete("/tasks", async (req, res) => {
//   let id = req.query.id;
//   try {
//     const result = await db.pool.query("delete from tasks where id = ?", [id]);
//     res.send(result);
//   } catch (err) {
//     throw err;
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
