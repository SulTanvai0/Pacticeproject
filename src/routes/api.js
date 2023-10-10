const { CreateProfile, logInProfile, selectProfile , updateProfile } = require('../controllers/ProfileController');
const { CreateToDo, SelectToDo, UpdateToDo, UpdateToDoStatus, RemoveToDo, SelectToDoByStatus, SelectToDoByDate } = require('../controllers/ToDoListController');
const middleware = require('../middleware/middleware');


const router = require('express').Router();

router.post("/CreateProfile" , CreateProfile)
router.post("/LogIn" , logInProfile)
// this api are secure by AuthVerify 
router.get("/readProfile", middleware.AuthVerify , selectProfile);
router.post("/updateProfile", middleware.AuthVerify ,updateProfile );

// TODO list api
router.post("/CreateToDo", middleware.AuthVerify, CreateToDo);
router.get("/SelectToDo", middleware.AuthVerify, SelectToDo);
router.post("/UpdateToDo", middleware.AuthVerify, UpdateToDo);
router.post("/UpdateToDoStatus", middleware.AuthVerify, UpdateToDoStatus);
router.post('/RemoveToDo' , middleware.AuthVerify , RemoveToDo);
router.post('/SelectToDoByStatus' , middleware.AuthVerify , SelectToDoByStatus);
router.post('/SelectToDoByDate' , middleware.AuthVerify , SelectToDoByDate);
module.exports = router; 

