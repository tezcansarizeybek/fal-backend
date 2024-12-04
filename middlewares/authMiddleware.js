const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Token'ı al
      token = req.headers.authorization.split(" ")[1];
      
      // Token'ı doğrula
      const decoded = jwt.verify(token, "your_jwt_secret");

      // Token'dan kullanıcı bilgilerini al
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Yetkisiz, geçersiz token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Yetkisiz, token bulunamadı" });
  }
};

module.exports = { protect };
