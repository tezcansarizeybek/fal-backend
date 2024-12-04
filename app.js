const express = require("express");
const connectDB = require("./config/db"); // MongoDB bağlantısını içe aktar
const setupSwagger = require("./config/swaggerConfig");
const userRoutes = require("./routes/userRoutes");
const falRoutes = require("./routes/falRoutes");
const commentatorRoutes = require("./routes/commentatorRoutes");

const app = express();

// Middleware
app.use(express.json());

// MongoDB Bağlantısını Başlat
connectDB();

// Swagger
setupSwagger(app);

// Rotalar
app.use("/api/users", userRoutes);
app.use("/api/fals", falRoutes);
app.use("/api/commentators", commentatorRoutes);

// Sunucu
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
