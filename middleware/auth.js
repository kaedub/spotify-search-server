/** Middleware for handling authorization */

function validat(req, res, next) {
  try {
    const token = req.body._token || req.query._token;
    let { username } = jwt.verify(token, SECRET);
    // put username on request as a convenience for routes
    req.username = username;
    return next();
  }

  catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
}


module.exports = {
  ensureLoggedIn,
};
