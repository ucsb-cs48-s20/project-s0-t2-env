import { createContext } from "react";

describe("Authentication", () => {
  context("When I am logged in", () => {
    it("logs in", () => {
      cy.loginAsGuest();
    });
  });
  context("When I am not logged in", () => {
    it("has a login button", () => {
      cy.visit("http://localhost:3000");

      cy.get("[data-cy=login]").should("exist");
    });
  });
});
