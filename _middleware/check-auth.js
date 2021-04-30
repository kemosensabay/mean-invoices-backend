const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.auth.split(" ")[1];
    // const token = req.headers.auth;
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    console.log(token);
    console.log(decodedToken);

    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      fullname: decodedToken.fullname,
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Access denied - Authentication failed",
    });
  }
};
