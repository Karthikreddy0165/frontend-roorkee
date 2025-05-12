describe("Feedback Modal - Missing Scheme", () => {
    beforeEach(() => {
      cy.visit("/"); 
      cy.login(); 
    });
  
    it("opens the feedback modal, switches to Missing Scheme, and shows validation error when submitting empty form", () => {
      cy.wait(2000);
      cy.contains("Feedback").click({ force: true });
      cy.contains("Share Your Feedback").should("be.visible");
  
      // Switch to Missing Scheme tab
      cy.contains("Missing Scheme").click();
      cy.contains("Suggest a Missing Scheme").should("be.visible");
  
      // Attempt to submit empty form
      cy.contains("Submit Feedback").click();
      cy.contains("Please provide scheme name and description.").should("be.visible");
    });
  
    it("allows filling and submitting the Missing Scheme form", () => {
      cy.contains("Feedback").click();
      cy.contains("Share Your Feedback").should("be.visible");
  
      // Switch to Missing Scheme tab
      cy.contains("Missing Scheme").click();
      cy.contains("Suggest a Missing Scheme").should("be.visible");
  
      // Fill the form
      cy.get('input[name="schemeName"]').type("Test Scheme");
      cy.get('input[name="schemeLink"]').type("https://example.com");
      cy.get('textarea[name="description"]').type(
        "This is a test scheme description with eligibility details."
      );
  
      // Intercept the API call
      cy.intercept("POST", "**/feedback/missing-scheme/", {
        statusCode: 200,
        body: {},
      }).as("submitMissingScheme");
  
      // Submit the form
      cy.contains("Submit Feedback").click();
      cy.wait("@submitMissingScheme");
      cy.contains("Missing scheme suggestion submitted successfully").should(
        "be.visible"
      );
    });
  
    it("closes the modal when close button is clicked in Missing Scheme mode", () => {
      cy.contains("Feedback").click();
      cy.contains("Share Your Feedback").should("be.visible");
  
      // Switch to Missing Scheme tab
      cy.contains("Missing Scheme").click();
      cy.contains("Suggest a Missing Scheme").should("be.visible");
  
      // Verify submit button exists
      cy.contains("Submit Feedback").should("exist");
  
      // Click close button
      cy.get("button").filter('[data-icon="close"]').click();
      cy.contains("Suggest a Missing Scheme").should("not.exist");
    });
  
    it("shows SavedModal when not logged in and trying to access Missing Scheme", () => {
      cy.logout(); // Assumes a custom logout command
      cy.contains("Feedback").click();
      cy.contains("give feedback").should("be.visible");
    });
  
    it("removes uploaded file in Missing Scheme form", () => {
      cy.contains("Feedback").click();
      cy.contains("Share Your Feedback").should("be.visible");
  
      // Switch to Missing Scheme tab
      cy.contains("Missing Scheme").click();
      cy.contains("Suggest a Missing Scheme").should("be.visible");
  
      // Upload a file
      cy.get('input[type="file"]').attachFile({
        filePath: "sample.pdf",
        mimeType: "application/pdf",
      });
      cy.contains("sample.pdf").should("be.visible");
  
      // Remove the file
      cy.contains("Remove file").click();
      cy.contains("sample.pdf").should("not.exist");
      cy.contains("Upload a file").should("be.visible");
    });
  });