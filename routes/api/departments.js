const express = require("express");
const router = express.Router();

const Department = require("../../models/Department");
const User = require("../../models/User");
const { ObjectID } = require("mongodb");

router.get('/list', async (req, res) => {
  try {
    let page = 0;
    let limit = 0;
    let skipSize = 0;
    if (req.query && req.query.page && req.query.limit) {
      page = parseInt(req.query.page, 10);
      limit = parseInt(req.query.limit, 10);
      skipSize = parseInt(limit * (page - 1), 10);
    }
    const departments = await Department.find({}).populate({
      path: 'users',
      model: User
    }).skip(skipSize).limit(limit);
    console.log(departments)
    res.status(200)
      .json(departments);
  } catch (error) {
    console.log(error)
    res.status(500)
      .json({message: 'some error occured'});
  }
})

module.exports = router;
