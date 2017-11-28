const { User } = require("./../models/user");

const authenticate = (req, res, next) => {
  const token = req.header("x-auth");

  User.findByToken(token)
    .then(user => {
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        return Promise.reject();
      }
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

module.exports = { authenticate };
