const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//@route GET api/events
//@desc Get events
//@acess Private

router.get("/", auth, (req, res) => {
  const { id } = req.user;
  Event.find({ user: id })
    .sort({ date: -1 })
    .limit(10)
    .then(events => res.json(events))
    .catch(e => res.send(e));
});

//@route POST api/events
//@desc create an event
//@acess Private

router.post("/", auth, (req, res) => {
  const event = req.body;

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

module.exports = router;
