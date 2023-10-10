const jwt = require("jsonwebtoken");

exports.AuthVerify = (req, res, next) => {
  const token = req.headers["token_key"];

  jwt.verify(token, "secret1230", (err, decoded) => {

    if (err) {
      res.status(400).json({ status: "Fail", data: err });
      console.error("JWT verification failed:", err.message);
    } else {
        //Get User Name From Decoded Token and add with req headers
        let UserName = decoded.UserName;
        req.headers['UserName'] = UserName;
        next();
    }
  });
};
