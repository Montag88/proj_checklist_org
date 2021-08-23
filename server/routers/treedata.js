const express = require('express');
const db = require('../../db/models/tree');

// const testTree = require('../../db/testdata');

const router = express.Router();

// temp
const userID = 1;

router.route('/')
  .get((req, res) => {
    db.exportData(userID, (err, data) => {
      if (err) res.status(400).send(err);
      res.type('json').status(200).send(data.data);
    });
  })
  .put((req, res) => {
    const userData = JSON.stringify(req.body.treeData);
    db.importData({ userID, userData }, (err) => {
      console.log('ERR FROM DB: ', err);
      if (err) res.status(400).send(err);
      res.status(200).end();
    });
  });

module.exports = router;
