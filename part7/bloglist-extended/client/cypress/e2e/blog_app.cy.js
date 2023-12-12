describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("/");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Luukkainen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.contains("invalid username or password");
    });
  });

  describe("When logged in", () => {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create-button").click();

      cy.get(".success")
        .should("contain", "a new blog test title by test author added")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");

      cy.contains("view").click();

      cy.contains("test title");
      cy.contains("test author");
      cy.contains("test url");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test title",
          author: "test author",
          url: "test url",
        });
      });

      it("it can be liked", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("likes 1");
      });

      it("it can be deleted", function () {
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.get(".success")
          .should("contain", "Blog removed successfully")
          .and("have.css", "color", "rgb(0, 128, 0)")
          .and("have.css", "border-style", "solid");
        cy.get("html").should("not.contain", "test title");
      });

      it("only the creator can delete it", function () {
        cy.contains("logout").click();
        const user = {
          username: "test",
          name: "test",
          password: "test",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
        cy.login({ username: "test", password: "test" });
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.get(".error").should("contain", "only the creator can delete blogs");
      });

      it("blogs are ordered according to likes", function () {
        cy.createBlog({
          title: "test title 2",
          author: "test author 2",
          url: "test url 2",
          likes: 2,
        });
        cy.createBlog({
          title: "test title 3",
          author: "test author 3",
          url: "test url 3",
          likes: 3,
        });

        cy.get(".blog").then((blogs) => {
          cy.wrap(blogs[0]).contains("view").click();
          cy.wrap(blogs[1]).contains("view").click();
          cy.wrap(blogs[2]).contains("view").click();

          cy.wrap(blogs[0]).contains("likes 3");
          cy.wrap(blogs[1]).contains("likes 2");
          cy.wrap(blogs[2]).contains("likes 0");
        });
      });
    });
  });

  afterEach(function () {
    cy.wait(3000);
  });
});
