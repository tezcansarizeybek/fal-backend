const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı oluştur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Kullanıcının adı
 *               lastName:
 *                 type: string
 *                 description: Kullanıcının soyadı
 *               email:
 *                 type: string
 *                 description: Kullanıcının e-postası
 *               username:
 *                 type: string
 *                 description: Kullanıcı adı
 *               password:
 *                 type: string
 *                 description: Şifre
 *               profilePhoto:
 *                 type: string
 *                 description: Kullanıcının profil fotoğrafı URL'si
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: string
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *               exampleInferences:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *       400:
 *         description: E-posta veya kullanıcı adı zaten kayıtlı
 *       500:
 *         description: Sunucu hatası
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Kullanıcı girişi yap
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Kullanıcının e-postası
 *               password:
 *                 type: string
 *                 description: Şifre
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *       401:
 *         description: Geçersiz e-posta veya şifre
 *       500:
 *         description: Sunucu hatası
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Kullanıcı profilini getir
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı profili
 *       401:
 *         description: Yetkisiz
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.get("/profile", protect, getUserProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Kullanıcı profilini güncelle
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Kullanıcının adı
 *               lastName:
 *                 type: string
 *                 description: Kullanıcının soyadı
 *               profilePhoto:
 *                 type: string
 *                 description: Kullanıcının profil fotoğrafı URL'si
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: string
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *               exampleInferences:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profil başarıyla güncellendi
 *       401:
 *         description: Yetkisiz
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.put("/profile", protect, updateUserProfile);

module.exports = router;
