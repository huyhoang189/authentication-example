const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authenticate Swagger API",
      description: "Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  //   console.log(swaggerSpec);
  // Swagger Page
  app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
