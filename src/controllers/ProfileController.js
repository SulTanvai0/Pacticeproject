const profileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");
exports.CreateProfile = (req, res) => {
  const reqBody = req.body;
  profileModel
    .create(reqBody)
    .then((data) => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(500).json({ status: "Fail", data: err });
    });
};

exports.logInProfile = (req, res) => {
  const UserName = req.body["UserName"];
  const Password = req.body["Password"];
  profileModel
    .findOne({ UserName: UserName, Password: Password })
    .then((data) => {
      if (data === null) {
        res.status(400).json({ status: "Fail", data: "User Not Found" });
      } else {
        //create auth token
        let payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          data: data, UserName: data.UserName
        };
       console.log(payload.data + "29")
        const token = jwt.sign(payload, "secret1230");

        res.status(200).json({ status: "success", token: token, data: data });
      }
    });
};

exports.selectProfile = (req, res) => {
 let UserName = req.headers['UserName']

  profileModel.find({ UserName: UserName })
  .then((data) => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(500).json({ status: "Fail", data: err });
    })
};

exports.updateProfile = (req, res) => {
  const UserName = req.headers['UserName']
  profileModel
    .updateOne({ UserName: UserName }, reqBody)
    .then((data) => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(500).json({ status: "Fail", data: err });
    });
 
}
