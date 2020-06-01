describe("Authentication", () => {
  context("When I am logged in as a guest", () => {
    beforeEach(() => {
      cy.loginAsGuest();
      cy.visit("http://localhost:3000");
    });

    it("shows me personal pages", () => {
      cy.get("[data-cy=personal-input]").should("exist");
    });

    it("has a logout button", () => {
      cy.get("[data-cy=greeting]").click();
      cy.get("[data-cy=logout]").should("exist");
    });

    it("does not have a login button", () => {
      cy.get("[data-cy=login]").should("not.exist");
    });
  });
  context("When I am not logged in", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("has a login button", () => {
      cy.get("[data-cy=login]").should("exist");
    });

    it("does not have a greeting", () => {
      cy.get("[data-cy=greeting]").should("not.exist");
    });

    it("does not have a logout button", () => {
      cy.get("[data-cy=logout]").should("not.exist");
    });
  });
});
