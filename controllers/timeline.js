const express = require('express');
const mongoose = require('mongoose');
const db = require('../models');
const router = express.Router();
//pull data from data base for timeline
//post route for array of oblects for timeline
router.post('/', (req, res) => {
    console.log(req.body);
    req.body.forEach((element) => {
        db.Task.create(element)
    .then((createdTask) => {
      console.log('created task:', createdTask);
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send('Could not create task in DB');
    });
});
//edit tasks
router.put('/', (req, res) => {
})
//delete tasks
router.delete('/', (req, res) => {
    db.Task.findOne({
        where: {id: req.params.id}
    }).then(() => {
        db.tag.destroy({
                where: {id: req.params.id}
            }).then(() => {
                res.send('success');
            }).catch(err => {
                res.status(500).send('failed to delete!');
            });
        }).catch(err => {
            res.status(500).send('failed to find task!');
        });
});