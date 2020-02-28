const { check, validationResult } = require('express-validator/check');
const userController = require('../controllers/user.controller.js');
module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  

  // Create a new Note
  app.post('/users',
  check('name').not().isEmpty().withMessage('User Name field is required'),
  check('useremail').not().isEmpty().withMessage('Email Id field is required').isEmail().withMessage('Please enter a Valid Email'),
  check('password').not().isEmpty().withMessage('Password field is required'),
  function(req, res){
    const errors = validationResult(req);
    //console.log(errors);
		if(!errors.isEmpty()){
      return res.status(400).send({status:false, message: errors.mapped()});
		}else{
			userController.create(req,res);
     // user.create
  }
});

  // Retrieve all Notes
  app.get('/users', user.findAll);

  // Retrieve a single Note with noteId
  app.get('/users/:user_id', user.findOne);

  // Update a Note with noteId
  app.put('/users/:userId', user.update);

  // Delete a Note with noteId
  app.delete('/users/:userId', user.delete);
}