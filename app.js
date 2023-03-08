const express = require("express");
const db = require("./db");
const app = express();
const port = 6000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET

const routeList = ["user", "admin", "company", "product"];

app.get("/", async (req, res) => {
  try {
    res.send(routeList);
  } catch (err) {
    throw err;
  }
});

app.get("/users", async (req, res) => {
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

//POST

app.post("/user", async (req, res) => {
  let task = req.body;
  try {
    const presult = await db.pool.query(
      `SELECT * FROM user WHERE user_id  = "${task.user_id}"`
    );
    if (presult.length < 0) {
      const result = await db.pool.query(
        `insert into user (user_id, name, mail, password) values ("${task.user_id}","${task.name}", "${task.mail}", "${task.password}")`
      );
      res.send(task);
    } else {
      res.send("user already exist");
    }
  } catch (err) {
    throw err;
  }
});

app.post("/company", async (req, res) => {
  let task = req.body;
  try {
    const presult = await db.pool.query(
      `SELECT * FROM company WHERE user_id  = "${task.company_id}"`
    );
    if (presult.length < 0) {
      const result = await db.pool.query(
        `insert into company (company_id, name, mail, siret) values ("${task.company_id}","${task.name}", "${task.mail}", "${task.siret}")`
      );
      res.send(task);
    } else {
      res.send("company already exist");
    }
  } catch (err) {
    throw err;
  }
});

app.post("/product", async (req, res) => {
  let task = req.body;
  try {
    const presult = await db.pool.query(
      `SELECT * FROM product WHERE product_id  = "${task.product_id}"`
    );
    if (presult.length < 0) {
      const result = await db.pool.query(
        `insert into product (product_id, name, quantity, unit, company_id) values ("${task.product_id}","${task.name}", "${task.quantity}", "${task.unit}", "${task.company_id}")`
      );
      res.send(task);
    } else {
      res.send("product already exist");
    }
  } catch (err) {
    throw err;
  }
});

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
