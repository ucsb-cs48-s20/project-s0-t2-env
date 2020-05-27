describe("Home page", () => {
  context("App/Nav Bar", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("exists", () => {
      cy.get("[data-cy=appbar]");
    });

    it("has a home page brand button", () => {
      cy.get(".navbar-brand").should("exist");
    });
  });
  context("Footer", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("exists", () => {
      cy.get("[data-cy=footer]");
    });
  });
  context("search bar", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("exists", () => {
      cy.get("[data-cy=search]").should("exist");
    });

    it("can be typed in", () => {
      cy.get("div[data-cy='searchfield']")
        .parent()
        .within(() => {
          cy.get("input").type("Goleta").should("have.value", "Goleta");
        });
    });
  });
});
