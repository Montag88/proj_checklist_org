const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/', express.static(path.resolve(__dirname, '../client/public')));

app.listen(port, () => {
  console.log(`Checklist listening at http://localhost:${port}`);
});

// axios post to server/db when tree changes
// to do
// scheme db
// route to db
// choose what data to store
