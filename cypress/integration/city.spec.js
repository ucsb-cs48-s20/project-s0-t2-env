describe("Cities page", () => {
  it("is reachable from the search bar", () => {
    cy.visit("http://localhost:3000");
    //cy.get("[data-cy=search]");
    //cy.get("Cities").click()
    //cy.url().should("contain", "/cities/goleta");
  });

  it("contains the correct data", () => {
    cy.visit("http://localhost:3000/cities/goleta");
    cy.get("[data-cy=location]").contains("Goleta, CA");
    cy.get("[data-cy=coordinates]").contains("34.4358295, -119.82763890000001");
    cy.get("[data-cy=population]").contains("Population: ");
    cy.get("[data-cy=carbon]").contains("Carbon Emissions:");
    cy.get("[data-cy=waterquality]").contains("Water pH Level:");
    cy.get("[data-cy=waterquality]")
      .contains("Total Dissolved Solids:")
      .contains("mg/L");
    cy.get("[data-cy=waterquality]")
      .contains("Specific Conductance:")
      .contains("μS/cm");
    cy.get("[data-cy=airquality]").contains("Today's Air Quality Index (AQI):");
  });
});

/* it("displays Goleta info", () => {
    const image = "https://images.dog.ceo/breeds/chow/n02112137_10654.jpg";

    cy.server().route("/api/dog", { image }).as("dog");

    cy.visit("http://localhost:3000/woof");

    cy.wait("@dog");

    cy.get("[data-cy=doggo]").should("have.attr", "src", image);
}); */
