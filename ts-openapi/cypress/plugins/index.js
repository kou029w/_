/// <reference types="cypress" />
const { SwaggerValidation } = require("@jc21/cypress-swagger-validation");

module.exports = (on, config) => {
  on("task", SwaggerValidation(config));
  return config;
};
