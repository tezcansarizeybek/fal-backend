const express = require("express");
const {
  registerCommentator,
  loginCommentator,
} = require("../controllers/commentatorController");

const router = express.Router();

/**
 * @swagger
 * /api/commentators/register:
 *   post:
 *     summary: Yeni bir fal yorumcusu kaydı oluştur
 *     tags: [Commentators]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Yorumcunun adı
 *               lastName:
 *                 type: string
 *                 description: Yorumcunun soyadı
 *               email:
 *                 type: string
 *                 description: Yorumcunun e-postası
 *               username:
 *                 type: string
 *                 description: Yorumcunun kullanıcı adı
 *               password:
 *                 type: string
 *                 description: Yorumcunun şifresi
 *               bankAccount:
 *                 type: string
 *                 description: Yorumcunun banka hesap bilgileri
 *     responses:
 *       201:
 *         description: Yorumcu başarıyla oluşturuldu
 *       400:
 *         description: Yorumcu zaten kayıtlı
 */
router.post("/register", registerCommentator);

/**
 * @swagger
 * /api/commentators/login:
 *   post:
 *     summary: Yorumcu giriş yapar
 *     tags: [Commentators]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Yorumcunun e-postası
 *               password:
 *                 type: string
 *                 description: Yorumcunun şifresi
 *     responses:
 *       200:
 *         description: Başarılı giriş
 *       401:
 *         description: Geçersiz e-posta veya şifre
 */
router.post("/login", loginCommentator);

module.exports = router;
