describe("Authentication", () => {
  context("When I am logged in as a guest", () => {
    beforeEach(() => {
      cy.loginAsGuest();
      cy.visit("http://localhost:3000");
    });

    it("shows me personal pages", () => {
      cy.get("[data-cy=personal-input]").should("exist");
    });
  });
  context("When I am not logged in", () => {
    it("has a login button", () => {
      cy.visit("http://localhost:3000");

      cy.get("[data-cy=login]").should("exist");
    });
  });
});
