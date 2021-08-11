const express = require('express');

const router = express.Router();

router.route('/')
  .put((req, res) => {
    console.log('req header: ', req.headers);
    console.log('body: ', req.body);
    res.status(200);
    res.send();
  });

module.exports = router;
