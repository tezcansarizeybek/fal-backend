const Fal = require("../models/Fal");
const User = require("../models/User");
const { sendPushNotification } = require("../services/notificationService");

exports.createFalRequest = async (req, res) => {
  try {
    const { images } = req.body;
    const fal = new Fal({
      user: req.user._id,
      images,
    });

    await fal.save();

    // Push notification to commentators
    sendPushNotification("Yeni bir fal isteği var!");

    res.status(201).json({ message: "Fal başarıyla oluşturuldu.", fal });
  } catch (error) {
    res.status(500).json({ message: "Fal isteği oluşturulamadı.", error });
  }
};

exports.reviewFal = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const fal = await Fal.findByIdAndUpdate(
      id,
      { comment, status: "reviewed", commentator: req.user._id },
      { new: true }
    );

    // Push notification to user
    sendPushNotification("Falınız yorumlandı!", fal.user);

    res.status(200).json({ message: "Fal yorumlandı.", fal });
  } catch (error) {
    res.status(500).json({ message: "Fal yorumlanamadı.", error });
  }
};

exports.rateFal = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, feedback } = req.body;

    const fal = await Fal.findByIdAndUpdate(
      id,
      { rating, userFeedback: feedback },
      { new: true }
    );

    res.status(200).json({ message: "Fal başarıyla puanlandı.", fal });
  } catch (error) {
    res.status(500).json({ message: "Fal puanlama başarısız.", error });
  }
};
