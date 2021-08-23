const express = require('express');
const path = require('path');

const treeDataRouter = require('./routers/treedata');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../client/public')));

app.use('/api/treedata', treeDataRouter);

app.listen(port, () => {
  console.log(`Checklist listening at http://localhost:${port}`);
});
