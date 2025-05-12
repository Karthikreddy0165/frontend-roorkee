describe("Feedback Modal", () => {
    beforeEach(() => {
      cy.visit("/"); 
      cy.login()
      cy.wait(2000)
    });
  
    it("opens the feedback modal when Feedback button is clicked (authenticated) and shows validation error when submitting empty form", () => {
      cy.contains("Feedback").click({force: true});
      cy.contains("Share Your Feedback").should("be.visible");
      cy.contains("Submit Feedback").click({force: true});
      cy.contains("Please provide a rating, category, and description.").should("be.visible");
    });
  
    it("allows selecting rating and filling form", () => {
      cy.contains("Feedback").click();
      cy.contains("Share Your Feedback").should("be.visible");
      cy.get("button svg path").eq(11).click({force: true});
      cy.get("select").select("Problem or Bug");
      cy.get("textarea").type("There is a bug in the layout.");
  
      cy.intercept("POST", "**/feedback/website-feedback/", {
        statusCode: 200,
        body: {},
      }).as("submitFeedback");
  
      cy.contains("Submit Feedback").click();
      cy.wait("@submitFeedback");
    });
  
    it("closes the modal when close button is clicked", () => {
      cy.contains("Feedback").click();
      cy.get("button").contains("Submit Feedback").should("exist"); 
      cy.get('[data-icon="close"]').click();
      cy.contains("Feedback Form").should("not.exist");
    });
  
    it("shows SavedModal when not logged in", () => {
      cy.logout()
      cy.contains("Feedback").click();
      cy.contains("give feedback").should("be.visible");
    });
  });
  