describe("e2e auth", () => {
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
        cy.intercept("POST", "auth/signin", { fixture: "auth-signin.json" });
        cy.intercept("GET", "users/me", { fixture: "users-me.json" });

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

    describe("when hitting the logout button", () => {
      it("logs out and redirects to the home page", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Logout").click();

        cy.url().should("match", /login/);
      });
    });
  });
});
