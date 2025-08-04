const router = require('express').Router();
let User = require('../models/user.model');

// Get all users
router.route('/').get((req, res) => {
  User.find()
    .populate('facilityId')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new user (Signup)
router.route('/add').post((req, res) => {
  const { name, email, password, role, facilityId } = req.body;

  // In a real app, you'd hash the password here with bcrypt
  const newUser = new User({
    name,
    email,
    password, // Plain text for now, BAD for production
    role,
    facilityId,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Basic Login
router.route('/login').post((req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found');
            }
            // In a real app, you would compare hashed passwords
            if (user.password === password) {
                // In a real app, you'd return a JWT token here
                res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role, facilityId: user.facilityId } });
            } else {
                res.status(400).json('Invalid credentials');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update a user by ID
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.role = req.body.role;
      user.facilityId = req.body.facilityId;
      // Note: Password updates should be handled separately and securely
      
      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a user by ID
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
