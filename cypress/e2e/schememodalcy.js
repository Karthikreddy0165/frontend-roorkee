describe("Scheme Modal Tests", () => {
    beforeEach(() => {
      cy.intercept("GET", "*", (req) => {
        console.log("GET request intercepted:", req.url);
      }).as("anyGetRequest");
  
      cy.visit(`/AllSchemes`); // go to home or category page
    });
  
    it("Should redirect to login on save/report click before login, and show share modal", () => {
      cy.contains("Schemes").click();
      cy.get('[data-testid="scheme-item"]').first().click();
  
      // Save
      cy.get('[data-testid="save-icon"]').click();
      cy.url().should("include", "/login");
  
      cy.visit(`/AllSchemes`); // return
      cy.get('[data-testid="scheme-item"]').first().click();
  
      // Report
      cy.get('[data-testid="report-icon"]').click();
      cy.url().should("include", "/login");
  
      cy.visit(`/AllSchemes`);
      cy.get('[data-testid="scheme-item"]').first().click();
  
      // Share
      cy.get('[data-testid="share-icon"]').click();
      cy.get('[data-testid="share-modal"]').should("exist");
      cy.get('[data-testid="close-share-modal"]').click(); // assuming there's a close button
    });
  
    it("Should perform save, unsave, report, share, and close after login", () => {
        cy.login()
      cy.visit("/AllSchemes");
      cy.get('[data-testid="scheme-item"]').first().click();
  
      // Save scheme
      cy.get('[data-testid="save-icon"]').click();
      cy.get('[data-testid="save-icon"] svg').should('have.class', 'text-[#3431BB]');
  
      // Unsave scheme
      cy.get('[data-testid="save-icon"]').click();
      cy.get('[data-testid="save-icon"] svg').should('not.have.class', 'text-[#3431BB]');
  
      // Report scheme
      cy.get('[data-testid="report-icon"]').click();
      cy.get('[data-testid="report-modal"]').should("exist");
      cy.get('[data-testid="report-reason"]').type("Incorrect information");
      cy.get('[data-testid="report-submit"]').click();
      cy.contains("Report submitted").should("be.visible");
  
      // Share scheme
      cy.get('[data-testid="share-icon"]').click();
      cy.get('[data-testid="share-modal"]').should("exist");
      cy.get('[data-testid="close-share-modal"]').click(); // close share modal
  
      // How to apply section
      cy.contains("How to Apply").scrollIntoView().should("be.visible");
  
      // Related schemes section
      cy.contains("Related Schemes").scrollIntoView().should("be.visible");
  
      // Close modal
      cy.get('[data-testid="close-icon"]').click();
      cy.get('[data-testid="scheme-modal"]').should("not.exist");
    });
  
    it("Should show PDF link when PDF is available", () => {
      cy.visit("/AllSchemes");
      cy.get('[data-testid="scheme-item"]').each(($el, index) => {
        cy.wrap($el).click();
        cy.get('[data-testid="scheme-modal"]').within(() => {
          cy.get('a[href$=".pdf"]').then(($link) => {
            if ($link.length) {
              cy.wrap($link).should("be.visible");
              cy.wrap($link).should("have.attr", "target", "_blank");
            } else {
              cy.log("No PDF found for this scheme");
            }
          });
        });
        cy.get('[data-testid="close-icon"]').click();
      });
    });
  });