const User = require('../models/user.model.js');


// Create and Save a new Note
exports.create = (req, res) => {
  

  // Validate request
  if(!req.body.name) {
    return res.status(400).send({
        status:false,
        message: "User Name can not be empty"
    });
  }
  if(!req.body.useremail) {
    return res.status(400).send({
        status:false,
        message: "User Email Id can not be empty"
    });
  }
  if(!req.body.username) {
    return res.status(400).send({
        status:false,
        message: "Username can not be empty"
    });
  }
  if(!req.body.password) {
    return res.status(400).send({
        status:false,
        message: "User password can not be empty"
    });
  }
  if(!req.body.location) {
    return res.status(400).send({
        status:false,
        message: "User location can not be empty"
    });
  }

// Create a Note
const user = new User({
  name: req.body.name, 
  useremail: req.body.useremail, 
  username: req.body.username, 
  location: req.body.location, 
  password: req.body.password
});

// Save user in the database
user.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        status:false,
        message: err.message || "Some error occurred while creating the Note."
    });
});

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};
