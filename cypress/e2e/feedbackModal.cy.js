describe("Feedback Modal", () => {
    beforeEach(() => {
      cy.visit("/"); 
      cy.login()
    });
  
    it("opens the feedback modal when Feedback button is clicked (authenticated) and shows validation error when submitting empty form", () => {
        cy.wait(2000)
      cy.contains("Feedback").click({force: true});
      cy.contains("Feedback Form").should("be.visible");
      cy.contains("Submit").click();
      cy.contains("Please provide a rating, category, and description.").should("be.visible");
    });
  
    it("allows selecting rating and filling form", () => {
      cy.contains("Feedback").click();
      cy.contains("Feedback Form").should("be.visible");
      cy.get("svg").eq(11).click();
      cy.get("select").select("bug");
      cy.get("textarea").type("There is a bug in the layout.");
  
      cy.intercept("POST", "**/feedback/website-feedback/", {
        statusCode: 200,
        body: {},
      }).as("submitFeedback");
  
      cy.contains("Submit").click();
      cy.wait("@submitFeedback");
      cy.contains("Feedback recieved successfully").should("be.visible");
    });
  
    it("closes the modal when close button is clicked", () => {
      cy.contains("Feedback").click();
      cy.get("button").contains("Submit").should("exist"); 
      cy.get("button").filter('[data-icon="close"]').click();
      cy.contains("Feedback Form").should("not.exist");
    });
  
    it("shows SavedModal when not logged in", () => {
      cy.logout()
      cy.contains("Feedback").click();
      cy.contains("give feedback").should("be.visible");
    });
  });
  