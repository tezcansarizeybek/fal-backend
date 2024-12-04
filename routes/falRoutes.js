const express = require("express");
const {
  createFalRequest,
  reviewFal,
  rateFal,
} = require("../controllers/falController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/fals/upload:
 *   post:
 *     summary: Yeni bir fal isteği oluştur
 *     tags: [Fals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Fotoğraf URL'leri
 *     responses:
 *       201:
 *         description: Fal başarıyla oluşturuldu
 *       500:
 *         description: Sunucu hatası
 */
router.post("/upload", protect, createFalRequest);

/**
 * @swagger
 * /api/fals/review/{id}:
 *   post:
 *     summary: Fal isteğini yorumla
 *     tags: [Fals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Fal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: Fal yorumu
 *     responses:
 *       200:
 *         description: Fal başarıyla yorumlandı
 *       500:
 *         description: Sunucu hatası
 */
router.post("/review/:id", protect, reviewFal);

/**
 * @swagger
 * /api/fals/rate/{id}:
 *   post:
 *     summary: Fal puanla ve geri bildirim ekle
 *     tags: [Fals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Fal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Puan (1-5 arası)
 *               feedback:
 *                 type: string
 *                 description: Kullanıcı geri bildirimi
 *     responses:
 *       200:
 *         description: Fal başarıyla puanlandı
 *       500:
 *         description: Sunucu hatası
 */
router.post("/rate/:id", protect, rateFal);

module.exports = router;
