describe("Personal Input Page", () => {
  context("When I am logged in as a guest", () => {
    beforeEach(() => {
      cy.loginAsGuest();
    });
    it("is accessible from the home page", () => {
      cy.visit("http://localhost:3000");
      cy.get("[data-cy=personal-input]").click({ force: true });
      cy.url().should("contain", "/login");
    });
  });
});
