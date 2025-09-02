const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    console.log("Auth header:", authHeader);
    if (!authHeader) return res.status(401).json({ msg: "No token, authorization denied" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    console.log("Decoded user:", req.user);
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = { auth };
