const HowTo = require("./howto.model.js");

//Create new HowTo
exports.create = (req, res) => {
  // Request validation

  if (!req.body) {
    return res.status(400).send({
      message: "HowTo content can not be empty"
    });
  }

  // Create a HowTo
  const howto = new HowTo({
    description: req.body.description,
    url: req.body.url,
    text: req.body.text
  });

  // Save HowTo in the database
  howto
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the howto."
      });
    });
};

// Retrieve all howtos from the database.
exports.findAll = (req, res) => {
  HowTo.find()
    .then(howtos => {
      res.send(howtos);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving howtos."
      });
    });
};

// Find a single howto with a howtoId
exports.findOne = (req, res) => {
  HowTo.findById(req.params.howtoId)
    .then(howto => {
      if (!howto) {
        return res.status(404).send({
          message: "HowTo not found with id " + req.params.howtoId
        });
      }
      res.send(howto);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "HowTo not found with id " + req.params.howtoId
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving howto with id " + req.params.howtoId
      });
    });
};

// Update a howto
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "HowTo content can not be empty"
    });
  }

  // Find and update howto with the request body
  HowTo.findByIdAndUpdate(
    req.params.howtoId,
    {
      description: req.body.description,
      url: req.body.url,
      text: req.body.text
    },
    { new: true }
  )
    .then(howto => {
      if (!howto) {
        return res.status(404).send({
          message: "HowTo not found with id " + req.params.howtoId
        });
      }
      res.send(howto);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "HowTo not found with id " + req.params.howtoId
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.howtoId
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  HowTo.findByIdAndRemove(req.params.howtoId)
    .then(howto => {
      if (!howto) {
        return res.status(404).send({
          message: "HowTo not found with id " + req.params.howtoId
        });
      }
      res.send({ message: "HowTo deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "HowTo not found with id " + req.params.howtoId
        });
      }
      return res.status(500).send({
        message: "Could not delete howto with id " + req.params.howtoId
      });
    });
};
