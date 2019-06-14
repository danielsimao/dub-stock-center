const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Event = require("../../models/event");

//@route GET api/events
//@desc Get events
//@acess Private

router.get("/:itemCount", auth, (req, res) => {
  const { id } = req.user;
  Event.find({ user: id })
    .sort({ timestamp: -1 })
    .limit(req.params.itemCount ? parseInt(req.params.itemCount) : 10)
    .then(events =>
      Event.countDocuments().then(count => {
        res.json({ events, count });
      })
    )
    .catch(e => res.send(e));
});

//@route POST api/events
//@desc create an event
//@acess Private

router.post("/", auth, (req, res) => {
  const { eventType, timestamp, action } = req.body;

  const { id } = req.user;

  const newEvent = new Event({ eventType, timestamp, action, user: id });

  newEvent
    .save()
    .then(event => res.json(event))
    .catch(e => res.send(e));
});

module.exports = router;
