const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, "1234", { expiresIn: "30m" }); // JWT anahtarınızı değiştirin
};

// Kullanıcı kaydı
exports.registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    profilePhoto,
    hobbies,
    preferences,
    exampleInferences,
  } = req.body;

  try {
    // E-posta veya kullanıcı adı zaten kayıtlı mı?
    const userExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "E-posta zaten kayıtlı" });
    }
    if (usernameExists) {
      return res.status(400).json({ message: "Kullanıcı adı zaten alınmış" });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      profilePhoto,
      hobbies,
      preferences,
      exampleInferences,
    });

    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      profilePhoto: user.profilePhoto,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Kayıt işlemi başarısız", error });
  }
};

// Kullanıcı girişi
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        profilePhoto: user.profilePhoto,
        hobbies: user.hobbies,
        preferences: user.preferences,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Geçersiz e-posta veya şifre" });
    }
  } catch (error) {
    res.status(500).json({ message: "Giriş işlemi başarısız", error });
  }
};

// Kullanıcı profilini getir
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("pastRequests");
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      profilePhoto: user.profilePhoto,
      hobbies: user.hobbies,
      preferences: user.preferences,
      exampleInferences: user.exampleInferences,
      pastRequests: user.pastRequests,
    });
  } catch (error) {
    res.status(500).json({ message: "Profil getirilemedi", error });
  }
};

// Kullanıcı profilini güncelle
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, profilePhoto, hobbies, preferences, exampleInferences } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.profilePhoto = profilePhoto || user.profilePhoto;
    user.hobbies = hobbies || user.hobbies;
    user.preferences = preferences || user.preferences;
    user.exampleInferences = exampleInferences || user.exampleInferences;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      username: updatedUser.username,
      profilePhoto: updatedUser.profilePhoto,
      hobbies: updatedUser.hobbies,
      preferences: updatedUser.preferences,
      exampleInferences: updatedUser.exampleInferences,
    });
  } catch (error) {
    res.status(500).json({ message: "Profil güncellenemedi", error });
  }
};
