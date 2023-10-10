const ToDoListModel = require("../models/TodoListModel");

exports.CreateToDo = (req, res) => {
  // Extract data from the request
  const reqBody = req.body;
  const UserName = req.headers["UserName"];
  const todoSubject = reqBody["todoSubject"];
  const todoDescription = reqBody["todoDescription"];
  
  // Create a new ToDo item based on the Mongoose model
  const newTodo = new ToDoListModel({
    UserName,
    TodoSubject: todoSubject,
    todoDescription,
    todoStatus: "New",
    todoCreateDate: Date.now(),
    todoUpdateDate: Date.now()
  });

  // Save the new ToDo item to the database
  ToDoListModel.create(newTodo)
    .then((data) => {
      res.status(201).json({ status: "success", data: data });
    })
    .catch((error) => {
      res.status(500).json({ status: "error", message: "Failed to create ToDo item", error: error.message });
    });
};

exports.SelectToDo = (req, res) => {
  let UserName = req.headers['UserName'];
  ToDoListModel.find({UserName: UserName})
  .then((data)=>{
    res.status(200).json({ status: "success", data: data });
  })
  .catch((err)=>{
    res.status(500).json({ status: "Fail", data: err });
  })

}

exports.UpdateToDo = (req, res) => {
  
  let todoSubject = req.body["todoSubject"];
  let todoDescription = req.body["todoDescription"];
  let _id = req.body['_id'];


  let updatedToDO = {
    todoSubject: todoSubject,
    todoDescription: todoDescription,
    todoUpdateDate: Date.now()
  }
  ToDoListModel.updateOne({_id : _id}, {$set : updatedToDO}, {upsert: true})
  .then((data)=>{
    res.status(200).json({ status: "success", data: data });
  })
  .catch((err)=>{
    res.status(500).json({ status: "Fail", data: err });
  })
}

exports.UpdateToDoStatus = (req, res) => {
  let todoStatus = req.body["todoStatus"];
  let _id = req.body['_id'];

  let updatedToDO = {
    todoStatus: todoStatus,
    todoUpdateDate: Date.now()
  }

  ToDoListModel.updateOne({_id : _id}, {$set : updatedToDO}, {upsert: true})
  .then((data)=>{
    res.status(200).json({ status: "success", data: data });
  })
  .catch((err)=>{
    res.status(500).json({ status: "Fail", data: err });
  })
}

exports.RemoveToDo = (req, res) => {
  let _id = req.body;
  
  ToDoListModel.findOneAndDelete({ _id })
    .then((deletedTodo) => {
      if (!deletedTodo) {
        return res.status(404).json({ status: "fail", message: "ToDo item not found" });
      }
      res.status(200).json({ status: "success", data: deletedTodo });
    })
    .catch((err) => {
      res.status(500).json({ status: "fail", data: err });
    });
};

exports.SelectToDoByStatus = (req, res) => {
  
  let todoStatus = req.body["todoStatus"]; 

  ToDoListModel.find({todoStatus: todoStatus})
  .then((data)=>{
    res.status(200).json({ status: "success", data: data });
  })
  .catch((err)=>{
    res.status(500).json({ status: "Fail", data: err });
  })
}


exports.SelectToDoByDate =(req, res)=>{
    let fromDate = req.body['fromDate'];
    let todoDate = req.body['todoDate'];

    ToDoListModel.find({todoCreateDate: { $gte: new Date(fromDate), $lte:new Date(todoDate)}})
    .then((data)=>{
        res.status(200).json({ status: "success", data: data });
    })
    .catch((err)=>{
        res.status(500).json({ status: "Fail", data: err });
    })
}