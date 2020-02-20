const User = require('../models/user.model.js');
//const { Validator } = require('node-input-validator');
const { validationResult } = require('express-validator/check');

// Create and Save a new Note
exports.create = (req, res) => {
  //console.log(req.body);
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  console.log(errors);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

  // const v = new Validator(req.body, {
  //   name: 'required',
  //   useremail: 'required|email'
  // });
  // v.check().then((matched) => {
  //   if (!matched) {
  //     res.status(422).send(v.errors);
  //   }
  // });

  ///console.log(v,"hellotest");
  // Validate request
  // if(!req.body.name) {
  //   return res.status(400).send({
  //       status:false,
  //       message: "User Name can not be empty"
  //   });
  // }

  // if(!req.body.useremail) {
  //   return res.status(400).send({
  //       status:false,
  //       message: "User Email Id can not be empty"
  //   });
  // }
  // if(!req.body.username) {
  //   return res.status(400).send({
  //       status:false,
  //       message: "Username can not be empty"
  //   });
  // }
  // if(!req.body.password) {
  //   return res.status(400).send({
  //       status:false,
  //       message: "User password can not be empty"
  //   });
  // }
  // if(!req.body.location) {
  //   return res.status(400).send({
  //       status:false,
  //       message: "User location can not be empty"
  //   });
  // }

// Create a Note

// const user = new User({
//   name: req.body.name, 
//   useremail: req.body.useremail, 
//   username: req.body.username, 
//   location: req.body.location, 
//   password: req.body.password
// });

// Save user in the database

// user.save()
// .then(data => {
//     res.send(data);
// }).catch(err => {
//     res.status(500).send({
//         status:false,
//         message: err.message || "Some error occurred while creating the Note."
//     });
// });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  console.log(req.params);
  User.findById(req.params.user_id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.user_id
        });
    });

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

  // Validate Request
  if(!req.body.content) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

// Find note and update it with the request body
Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
}, {new: true})
.then(note => {
    if(!note) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
    });
});


};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};
