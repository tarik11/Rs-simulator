const mongoos = require("mongoose");

const Schema = mongoos.Schema;

const projectSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  ArrayLine: {
    type: Array,
    required: true,
  },
  ArrayIn: {
    type: Array,
    required: true,
  },
  ArrayOr: {
    type: Array,
    required: true,
  },
  ArrayAnd: {
    type: Array,
    required: true,
  },
  ArrayNot: {
    type: Array,
    required: true,
  },
  post: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoos.model("project", projectSchema);
