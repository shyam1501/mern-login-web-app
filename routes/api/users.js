const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Department = require("../../models/Department");
const {ObjectId } = require("mongodb");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.department = req.body.departmentId;
          newUser
            .save()
            .then(async (user) => {
              await Department.updateOne({_id: req.body.departmentId},{$push: {users: user._id}})
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post('/associate', async (req, res) => {
  const userId = "5f2fdd81056df066973cb833"
  const departmentIdToAssociate = req.body.departmentId;
  const updateduser = await User.update({ _id: userId }, { department: departmentIdToAssociate }, { new: true });
  if (updateduser.ok) {
    res.status(200)
      .json({ message: 'user Successfully associated' });
  }
})

router.get('/list', async (req, res) => {
  let page = 0;
  let limit = 0;
  let skipSize = 0;
  if (req.query && req.query.page && req.query.limit) {
    page = parseInt(req.query.page, 10);
    limit = parseInt(req.query.limit, 10);
    skipSize = parseInt(limit * (page - 1), 10);
  }
  let condition={};
  if(req.query && req.query.departmentId){
    condition = {
      department: ObjectId(req.query.departmentId)
    };
  }
  const users = await User.find(condition).select({_id: 1, name: 1, email: 1, department: 1}).skip(skipSize).limit(limit);
  console.log(users)
  res.status(200)
    .json(users);
})

module.exports = router;
