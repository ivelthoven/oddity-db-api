const err = require("restify-errors");
const db = require("../db");

db.removeUsersTable()
  .then(() => {
    console.log("Removed Users Table");
  })
  .catch(err => {
    console.log(err);
  });
db.createUsersTable()
  .then(() => {
    console.log("Created Users Table");
  })
  .catch(err => {
    console.log(err);
  });

module.exports = server => {
  server.get("/users/:id", (req, res) => {
    db.getUsers(req.params.id)
      .then(v => {
        res.send(v);
      })
      .catch(err => {
        console.log(err);
        res.send(new err.InternalServerError("something went wrong"));
      });
  });

  server.post("/users", (req, res) => {
    if (!req.body) {
      return res.send(new err.BadRequestError("wrong input"));
    }

    const username = req.body.username;

    db.createUser(username)
      .then(v => {
        res.send("success");
      })
      .catch(err => {
        console.log(err);
        res.send("something went wrong");
      });
  });
};
