const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    UserName: { type: String },
    todoSubject: { type: String },
    todoDescription: { type: String },
    todoStatus: { type: String },
    todoCreateDate: { type: Date},
    todoUpdateDate: { type: Date},
  },
  { versionKey: false }
);

const ToDoListModel = mongoose.model("List", DataSchema);

module.exports = ToDoListModel;
