Cypress.Commands.add(
  "login",
  (email = "fabien@gmail.com", password = "test123") => {
    cy.visit("http://localhost:3000/login");
    cy.wait(100);
    cy.get("[placeholder=Email]").type(email);
    cy.get("[placeholder=Password]").type(password);
    cy.get("button").contains("Login").click();
    cy.url().should("equal", "http://localhost:3000/");
  }
);
