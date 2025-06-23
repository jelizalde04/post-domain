const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "post Profile API",
      version: "1.0.0",
      description: "API para el manejo de perfiles de mascotas",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/postRoutes.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs-createPost", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
