const jwt = require('jsonwebtoken');
var db = require('../models/index');

exports.userAuthMiddleWare = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const accessToken = authHeader.split(' ')[1];
      try {
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // If token has expired
        if (exp < Date.now().valueOf() / 1000) {
          return res.status(401).json({ message: 'Unauthorized User, Please Login again' });
        }
        res.locals.loggedInUser = await db.models.UserModel.findById(userId);
        req.user = res.locals.loggedInUser;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Error occured ' + error });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized User, Please pass the correct token' });
    }
  }
  
  
  exports.allowIfLoggedIn = async (req, res, next) => {
    try {
      const user = res.locals.loggedInUser;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized User, Please pass the correct token' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(423).json({ message: 'Error occured ' + error });
    }
  }