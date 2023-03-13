import dayjs from "dayjs";

describe("e2e conversations", () => {
  beforeEach(() => {
    cy.login();

    // @TODO: to remove
    cy.intercept("GET", "**/*", (req) => {
      console.log(req.method, req.url);
      req.continue();
    }).as("blanket");
  });

  describe("When going to the conversations page", () => {
    it.only("renders a list of conversations", () => {
      // @TODO: to fix
      // cy.intercept(
      //   {
      //     method: "GET",
      //     port: 4000,
      //     url: "*",
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //   },
      //   {
      //     // fixture: "conversations.json",
      //     body: {
      //       data: "HELLo",
      //     },
      //   }
      // ).as("convos");

      cy.visit("http://localhost:3000/conversations");

      // cy.wait("@convos").then((req) => {
      //   console.log(req);
      // });

      cy.get("div.conversation").should("exist");
    });

    describe("when clicking on a conversation", () => {
      // @TODO: fix
      it.skip("opens the conversation", () => {
        cy.visit("http://localhost:3000/conversations");

        cy.get("div.conversation").first().click();

        cy.url().should("include", "/conversations/1");
      });

      describe("when writing text inside the conversation and sending it", () => {
        it("renders in as a new message", () => {
          cy.visit("http://localhost:3000/conversations/1");

          const text = `message-${dayjs().format("YYYYMMDDHHmmss")}`;

          cy.get("input").wait(50).type(text).type("{enter}");
          cy.get("[data-test=message]").contains(text).should("exist");
        });
      });
    });
  });
});
