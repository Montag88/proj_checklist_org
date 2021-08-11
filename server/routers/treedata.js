const express = require('express');
const taskTreeController = require('../../db/models/tree');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    // console.log(req);
    // get data
    const test = [
      {
        id: 10,
        expanded: true,
        data: 'hello',
        children: [
          {
            id: 40,
            expanded: true,
            data: 'does this work?',
            children: [],
          },
          {
            id: 50,
            expanded: true,
            children: [],
          },
        ],
      },
      { id: 20, expanded: true, children: [] },
      {
        id: 30,
        expanded: true,
        children: [
          {
            id: 60,
            expanded: true,
            children: [
              {
                id: 80,
                expanded: true,
                children: [],
              },
              {
                id: 90,
                expanded: true,
                children: [],
              },
            ],
          },
          {
            id: 70,
            expanded: true,
            children: [],
          },
        ],
      },
    ];
    const body = JSON.stringify(test);
    res.status(200).send(body);
  })
  .put((req, res) => {
    // console.log('body: ', req.body);
    // res config currently contains req body
    res.status(200).send();
  });

module.exports = router;
