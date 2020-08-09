const express = require("express");
const router = express.Router();
const socketConnection = require('../../socketserver');
const Form = require("../../models/Form");
const User = require("../../models/User");
const { ObjectID } = require("mongodb");

router.get('/', async (req, res) => {
  try {
    let page = 0;
    let limit = 0;
    let skipSize = 0;
    if (req.query && req.query.page && req.query.limit) {
      page = parseInt(req.query.page, 10);
      limit = parseInt(req.query.limit, 10);
      skipSize = parseInt(limit * (page - 1), 10);
    }
    const forms = await Form.find({}).populate({
      path: 'assignedBy',
      select: ['name','email'],
      model: User
    }).populate({
      path: 'assignedTo',
      select: ['name','email'],
      model: User
    }).skip(skipSize).limit(limit);
    console.log(forms)
    res.status(200)
      .json(forms);
  } catch (error) {
    console.log(error)
    res.status(500)
      .json({ message: 'some error occured' });
  }
})

router.post('/', async (req, resp) => {

  try {
    const formObj = new Form({
      name: req.body.name,
      department: req.body.departmentId,
      assignedBy: req.body.assignedBy,
      assignedTo: req.body.assignedTo,
      status: 'PENDING'
    })

    const createdform = await formObj.save();
    const pubTobic = '/forms/create';
    socketConnection.emit(pubTobic, createdform);
    if(createdform){
      resp.status(200)
      .json(createdform);
    }
  } catch (error) {
    console.log(error)
    res.status(500)
      .json({message: 'some error occured'});
  }

})

router.put('/:formId', async (req, resp) => {

  try {
    const formId = req.params.formId;
    const formObj = {
      name: req.body.name,
      department: req.body.departmentId,
      assignedBy: req.body.assignedBy,
      assignedTo: req.body.assignedTo,
      status: req.body.status
    }

    const createdform = await Form.updateOne({_id: formId}, formObj);
    const pubTobic = '/forms/update';
    formObj._id = formId;
    socketConnection.emit(pubTobic, formObj);
    if(createdform){
      resp.status(200)
      .json(createdform);
    }
  } catch (error) {
    console.log(error)
    res.status(500)
      .json({message: 'some error occured'});
  }

})
module.exports = router;
