function authenticateUser(req, res, next) {
  if (!req.session || !req.session.userId) {
    console.log("Unauthorized access attempt");
    return res.status(401).json({ message: "Unauthorized fdfdfd" });
  }
  next();
  console.log(`Authenticated user: ${req.session.userId}`);
}

const authorizeUser = (...requiredRoles) => {
  return (req, res, next) => {
    if (req.session && req.session.role) {
      if (requiredRoles.includes(req.session.role)) {
        console.log(`User role authorized: ${req.session.role}`);
        return next();
      } else {
        console.log(
          `Forbidden access: User role '${
            req.session.role
          }' does not match required roles '${requiredRoles.join(", ")}'`
        );
        return res
          .status(403)
          .json({ message: "Forbidden access. Insufficient permissions." });
      }
    } else {
      console.log("No role found in session");
      return res
        .status(403)
        .json({ message: "Forbidden access. Insufficient permissions." });
    }
  };
};

module.exports = { authenticateUser, authorizeUser };
