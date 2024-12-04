const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fal Uygulaması API",
      version: "1.0.0",
      description: "Kahve falı uygulaması için API dokümantasyonu",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Lokal Geliştirme Sunucusu",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Rota dosyalarının yolunu kontrol edin
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger UI: http://localhost:5000/api-docs");
};

module.exports = setupSwagger;
