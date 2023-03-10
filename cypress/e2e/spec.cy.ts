import dayjs from "dayjs";

describe("e2e spec", () => {
  it("is not down", () => {
    cy.visit("http://localhost:3000");
  });

  describe("when not logged in", () => {
    describe("when going to the conversations page", () => {
      it("redirects to the login page", () => {
        cy.visit("http://localhost:3000/conversations");

        cy.url().should("match", /login/);
      });
    });

    describe("when logging in", () => {
      it("redirects to the home page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Login").click();
        cy.url().should("match", /login/);

        cy.wait(100);
        cy.get("[placeholder=Email]").type("fabien@gmail.com");
        cy.get("[placeholder=Password]").type("test123");
        cy.get("button").contains("Login").click();

        cy.url().should("equal", "http://localhost:3000/");
      });
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login();
    });

    describe("when going to the login page", () => {
      it("redirects to the home page", () => {
        cy.visit("http://localhost:3000/login");

        cy.url().should("equal", "http://localhost:3000/");
      });
    });

    describe("when going to the signup page", () => {
      it("redirects to the home page", () => {
        cy.visit("http://localhost:3000/signup");

        cy.url().should("equal", "http://localhost:3000/");
      });
    });

    describe("When going to the conversations page", () => {
      it("renders a list of conversations", () => {
        cy.visit("http://localhost:3000/conversations");

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

    describe("when hitting the logout button", () => {
      it("logs out and redirects to the home page", () => {
        cy.visit("http://localhost:3000");

        cy.get(".btn").contains("Logout").click();

        cy.url().should("match", /login/);
      });
    });
  });
});
