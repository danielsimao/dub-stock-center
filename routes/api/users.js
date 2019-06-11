const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//@route POST api/users
//@desc Register new user
//@acess Public

router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ name, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: { id: user.id, name: user.name, email: user.email }
              });
            }
          );
        });
      });
    });
  });
});

router.get("/favorites", auth, (req, res) => {
  const { id } = req.user;
  User.findOne({ _id: id })
    .then(user => res.json(user.favorites))
    .catch(e => res.send(e));
});

router.post("/favorites", auth, (req, res) => {
  const favStock = req.body;

  const { id } = req.user;
  User.findOne({ _id: id })
    .then(user => {
      if (user.favorites.length < 2) {
        user.favorites.push(favStock);
        user.save().then(user => res.json(user.favorites));
      } else res.status(404).json({ msg: "Max. 2 Favorites Stocks" });
    })
    .catch(e => res.send(e));
});

router.delete("/favorites/:id", auth, (req, res) => {
  const { id } = req.user;
  User.findOne({ _id: id })
    .then(user => {
      user.favorites = user.favorites.filter(obj => obj._id != req.params.id);
      user.save().then(user => res.json(user.favorites));
    })
    .catch(err => res.status(404).json({ sucess: false }));
});

module.exports = router;
