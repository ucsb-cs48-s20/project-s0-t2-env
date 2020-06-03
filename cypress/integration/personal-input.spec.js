describe("Personal Input Page", () => {
  context("Navigating to the page", () => {
    beforeEach(() => {
      cy.loginAsGuest();
    });

    it("is accessible from the home page", () => {
      cy.visit("http://localhost:3000");
      cy.get("[data-cy=personal-input]").click({ force: true });
      cy.url().should("contain", "/login");
    });
  });

  context("On the page", () => {
    beforeEach(() => {
      cy.loginAsGuest();
      cy.visit("http://localhost:3000/login");
    });

    it("has the correct date filled in", () => {
      const todaysDate = Cypress.moment().format("MMMM D, YYYY");
      cy.get(".react-datepicker-wrapper")
        .parent()
        .within(() => {
          cy.get("input").should("have.value", todaysDate);
        });
    });

    it("has a miles driven field which can be typed in and shows a graph", () => {
      cy.get("[data-cy=milesdriven]").type("3").should("have.value", "3");
      cy.get("[data-cy=milesDrivenGraph]").should("exist");
    });

    it("has a meat consumption field which can be typed in and shows a graph", () => {
      cy.get("[data-cy=meatConsumption]").type("2").should("have.value", "2");
      cy.get("[data-cy=mealsEatenGraph]").should("exist");
    });

    it("has an air conditioning/heating field which can be typed in and shows a graph", () => {
      cy.get("[data-cy=tempApplianceUsage").type("5").should("have.value", "5");
      cy.get("[data-cy=ACHeaterGraph]").should("exist");
    });

    it("has a time in shower field and can be typed in and shows a graph", () => {
      cy.get("[data-cy=showerTime]").type("8").should("have.value", "8");
      cy.get("[data-cy=showerGraph]").should("exist");
    });

    it("has a screen time field and can be typed in and shows a graph", () => {
      cy.get("[data-cy=screenTime]").type("5").should("have.value", "5");
      cy.get("[data-cy=screenGraph]").should("exist");
    });

    it("can be reset", () => {
      cy.get("[data-cy=milesdriven]").type("5");
      cy.get("[data-cy=meatConsumption]").type("2");
      cy.get("[data-cy=tempApplianceUsage").type("5");
      cy.get("[data-cy=showerTime]").type("8");
      cy.get("[data-cy=screenTime]").type("5");

      cy.get("[data-cy=reset]").click({ force: true });
      const todaysDate = Cypress.moment().format("MMMM D, YYYY");
      cy.get(".react-datepicker-wrapper")
        .parent()
        .within(() => {
          cy.get("input").should("have.value", todaysDate);
        });

      cy.get("[data-cy=milesdriven]").should("have.value", "");
      cy.get("[data-cy=meatConsumption]").should("have.value", "");
      cy.get("[data-cy=tempApplianceUsage").should("have.value", "");
      cy.get("[data-cy=showerTime]").should("have.value", "");
      cy.get("[data-cy=screenTime]").should("have.value", "");

      cy.get("[data-cy=milesDrivenGraph]").should("not.exist");
      cy.get("[data-cy=mealsEatenGraph]").should("not.exist");
      cy.get("[data-cy=ACHeaterGraph]").should("not.exist");
      cy.get("[data-cy=showerGraph]").should("not.exist");
      cy.get("[data-cy=screenGraph]").should("not.exist");
    });
  });
});
