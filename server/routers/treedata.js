const express = require('express');
const db = require('../../db/models/tree');

// const testTree = require('../../db/testdata');

const router = express.Router();

// set up proper respose codes for errors and alerts for errors
// set proper config for response to browser (put res config contains req body)

// temp only
const userID = 1;

router.route('/')
  .get((req, res) => {
    db.exportData(userID, (err, data) => {
      if (err) res.status(401).send(err);
      res.status(200).send(data.data);
    });
  })
  .put((req, res) => {
    console.log('REQ FROM USER: ', req);
    const userData = JSON.stringify(req.body.treeData);
    db.importData({ userID, userData }, (err, data) => {
      console.log('ERR FROM DB: ', err);
      console.log('DATA FROM DB: ', data);
      if (err) res.status(401).send(err);
      res.status(200).send();
    });
  });

module.exports = router;
