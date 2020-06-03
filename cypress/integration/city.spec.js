describe("Cities page", () => {
  context("Navigating to the page", () => {
    it("is reachable from the search bar", () => {
      cy.visit("http://localhost:3000");
      cy.get("div[data-cy='searchfield']")
        .parent()
        .within(() => {
          cy.get("input").type("Goleta");
        });
      cy.contains("Goleta").click({ force: true });
      cy.url().should("contain", "/cities/Goleta");
    });
  });
  context("On the page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/cities/goleta");
    });
    it("contains the location and population data", () => {
      cy.get("[data-cy=location]").contains("Goleta, CA");
      cy.get("[data-cy=population]").contains("Population");
    });
    it("contains carbon data", () => {
      cy.get("[data-cy=carbon]").contains("Emits");
    });
    it("contains water data", () => {
      cy.get("[data-cy=waterquality]").contains("Water pH Level");
      cy.get("[data-cy=waterquality]")
        .contains("Total Dissolved Solids")
        .contains("mg/L");
      cy.get("[data-cy=waterquality]")
        .contains("Specific Conductance")
        .contains("μS/cm");
    });
    it("contains air quality data", () => {
      cy.get("[data-cy=airquality]").contains(
        "Today's Air Quality Index (AQI)"
      );
    });
  });
});
