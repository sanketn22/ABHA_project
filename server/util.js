const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
  // console.log(user);
  // Sign the JWT
  if (!user.role) {
    throw new Error("No user role specified");
  }
  return jwt.sign(
    {
      ids: user.prNo || user.empNo || null,
      abha_id: user.abha_Id || null,
      emailid: user.emailId || null,
      role: user.role,
      iss: "api.abha",
      aud: "api.abha",
    },
    process.env.SECRET_KEY,
    { algorithm: "HS256", expiresIn: "1h" }
  );
};

// const requireAuth = (req, res, next) => {
//   const { user } = req.session;
//   if (!user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   next();
// };

const requireAdmin = (req, res, next) => {
  const { user } = req.session;
  if (user.role !== "admin") {
    return res.status(401).json({ message: "Insufficient role" });
  }
  next();
};

module.exports = {
  createToken,
  requireAdmin,
};
