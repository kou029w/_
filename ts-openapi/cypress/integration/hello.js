/// <reference types="cypress" />

describe("Basic API checks", () => {
  it("Should return a valid health payload", function () {
    cy.request("/hello").then(($response) => {
      cy.task("validateSwaggerSchema", {
        file: "./openapi.json",
        endpoint: "/hello",
        method: "get",
        statusCode: 200,
        responseSchema: $response.body,
        verbose: true,
      }).should("deep.equal", {});
    });
  });
  it("Get", function () {
    cy.request("/hello").its("body").eq("hello");
  });
});
