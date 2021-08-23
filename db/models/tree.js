const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).catch((err) => console.log(err.reason)); // catches error only on initial connection

const db = mongoose.connection;
// catches error after successful connection
db.on('error', (err) => {
  console.log(err.reason);
});

const taskTreeSchema = new Schema({
  user: {
    type: Number,
    unique: true,
  },
  data: String, // data is json stringify of nested tree
});

const TaskTree = mongoose.model('TaskTree', taskTreeSchema);

function importData({ userID, userData }, cb) {
  const options = {
    runValidators: true,
    upsert: true,
  };
  TaskTree.findOneAndUpdate({ user: userID }, { data: userData }, options, cb);
}

function exportData(userid, cb) {
  TaskTree.findOne({ user: userid }, cb);
}

module.exports.importData = importData;
module.exports.exportData = exportData;
