import { createContext } from "react";

describe("Authentication", () => {
  context("When I am logged in as a guest", () => {
    beforeEach(() => {
      cy.loginAsGuest();
      cy.visit("http://localhost:3000");
    });

    it("shows me personal pages", () => {
      cy.get(".navbar-nav").contains("Personal Input");
    });
  });
  context("When I am not logged in", () => {
    it("has a login button", () => {
      cy.visit("http://localhost:3000");

      cy.get("[data-cy=login]").should("exist");
    });
  });
});
/*
describe("login", () => {
  it("should successfully log into our app", () => {
    cy.loginAsGuest()
      .then((resp) => {
        return resp.body;
      })
      .then((body) => {
        const { access_token, expires_in, id_token } = body;
        const auth0State = {
          nonce: "",
          state: "some-random-state",
        };
        const callbackUrl = `/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        cy.visit(callbackUrl, {
          onBeforeLoad(win) {
            win.document.cookie =
              "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
          },
        });
      });
  });
});*/
