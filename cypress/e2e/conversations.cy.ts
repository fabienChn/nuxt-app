import dayjs from "dayjs";

describe("e2e conversations", () => {
  beforeEach(() => {
    cy.login();
  });

  describe("When going to the conversations page", () => {
    it.only("renders a list of conversations", () => {
      // @TODO: to fix
      cy.task("mockServer", {
        interceptUrl: "http://localhost:4000/conversations",
        fixture: "conversations.json",
      });

      cy.visit("http://localhost:3000/conversations");

      cy.get("div.conversation").should("exist");
    });

    describe("when clicking on a conversation", () => {
      // @TODO: fix
      it.skip("opens the conversation", () => {
        // TODO: intercept get conversations & get conversations/1 && get messages/1
        cy.visit("http://localhost:3000/conversations");

        cy.get("div.conversation").first().click();

        cy.url().should("include", "/conversations/1");
      });

      describe("when writing text inside the conversation and sending it", () => {
        it("renders in as a new message", () => {
          // TODO: intercept get conversations/1 & get messages/1

          cy.visit("http://localhost:3000/conversations/1");

          const text = `message-${dayjs().format("YYYYMMDDHHmmss")}`;

          // TODO: intercept websocket

          cy.get("input").wait(50).type(text).type("{enter}");
          cy.get("[data-test=message]").contains(text).should("exist");
        });
      });
    });
  });
});
