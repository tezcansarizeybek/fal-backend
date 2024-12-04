const Commentator = require("../models/Commentator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, "1234", { expiresIn: "30m" }); // JWT anahtarınızı buraya koyun
};

// Yorumcu kaydı
exports.registerCommentator = async (req, res) => {
  const { firstName, lastName, email, username, password, bankAccount, salary } = req.body;

  try {
    const commentatorExists = await Commentator.findOne({ email });
    if (commentatorExists) {
      return res.status(400).json({ message: "E-posta zaten kayıtlı" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const commentator = await Commentator.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      bankAccount,
      salary,
    });

    res.status(201).json({
      _id: commentator.id,
      firstName: commentator.firstName,
      lastName: commentator.lastName,
      email: commentator.email,
      token: generateToken(commentator.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Kayıt işlemi başarısız", error });
  }
};

// Yorumcu girişi
exports.loginCommentator = async (req, res) => {
  const { email, password } = req.body;

  try {
    const commentator = await Commentator.findOne({ email });
    if (commentator && (await bcrypt.compare(password, commentator.password))) {
      res.status(200).json({
        _id: commentator.id,
        firstName: commentator.firstName,
        lastName: commentator.lastName,
        email: commentator.email,
        token: generateToken(commentator.id),
      });
    } else {
      res.status(401).json({ message: "Geçersiz e-posta veya şifre" });
    }
  } catch (error) {
    res.status(500).json({ message: "Giriş işlemi başarısız", error });
  }
};
