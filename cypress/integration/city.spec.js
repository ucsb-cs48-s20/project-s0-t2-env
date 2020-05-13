describe("Cities page", () => {
  it("is reachable from the navbar", () => {
    cy.visit("http://localhost:3000");

    //cy.contains("Cities").click();

    //cy.url().should("contain", "/cities/goleta");
  });

  /*it("displays Goleta info", () => {
    /*const image = "https://images.dog.ceo/breeds/chow/n02112137_10654.jpg";

    cy.server().route("/api/dog", { image }).as("dog");

    cy.visit("http://localhost:3000/woof");

    cy.wait("@dog");

    cy.get("[data-cy=doggo]").should("have.attr", "src", image);*/
  });*/
});
