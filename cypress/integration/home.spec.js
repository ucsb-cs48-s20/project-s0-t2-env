describe("Home page", () => {
  context("nav bar", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("exists", () => {
      cy.get("nav.navbar").should("exist");
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
      cy.get("#searchfield");
      //cy.get("div[data-cy='search-input']")
      //  .parent()
      //  .within(() => {
      //    cy.get("input").type("StackOverflowHelp");
      //  });
    });
  });
});
