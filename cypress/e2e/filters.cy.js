describe("Filters Component", () => {
    beforeEach(() => {
      cy.visit("/AllSchemes"); 
    });
  
    // Rendering Tests
    it("should render the 'Filters' title", () => {
      cy.contains("Filters").should("be.visible");
    });
  
    it("should display the 'Clear all filters' button", () => {
      cy.get("button").contains("Clear all filters").should("be.visible");
    });
  
    it("should initially hide dropdowns for 'Sponsored By,' 'Department,' and 'Beneficiaries'", () => {
      cy.get("[data-testid=sponsored-dropdown]").should("not.exist");
      cy.get("[data-testid=department-dropdown]").should("not.exist");
      cy.get("[data-testid=beneficiaries-dropdown]").should("not.exist");
    });
  
    // Dropdown Interactions
    it("should toggle 'Sponsored By' dropdown when clicked", () => {
      cy.get("[data-testid=sponsored-button]").click();
      cy.get("[data-testid=sponsored-dropdown]").should("be.visible");
  
      cy.get("[data-testid=sponsored-button]").click();
      cy.get("[data-testid=sponsored-dropdown]").should("not.exist");
    });
  
    it("should toggle 'Department' dropdown only if isDepartmentVisible is true", () => {
      cy.get("[data-testid=sponsored-button]").click();
      cy.get("[data-testid=sponsored-option]").first().click();
      // need to select state or central option for department to be visible 
      cy.get("[data-testid=department-button]").click();
      cy.get("[data-testid=department-dropdown]").should("be.visible");
    });
  
    it("should toggle 'Beneficiaries' dropdown only if isBeneficiaryVisible is true", () => {
      cy.get("[data-testid=sponsored-button]").click();
      cy.get("[data-testid=sponsored-option]").first().click();
      // need to select state or central option for beneficiary to be visible 
      cy.get("[data-testid=beneficiaries-button]").click();
      cy.get("[data-testid=beneficiaries-dropdown]").should("be.visible");
    });
  
    // Clearing Filters
    it("should reset all selected filters when clicking 'Clear all filters'", () => {
      cy.get("[data-testid=sponsored-button]").click();
      cy.get("[data-testid=sponsored-dropdown]").should("be.visible");
      cy.get("[data-testid=sponsored-option]").first().click();
      cy.get("[data-testid=selected-filter]").should("exist");
  
      cy.get("button").contains("Clear all filters").click();
      cy.get("[data-testid=selected-filter]").should("not.exist");
    });
  
    it("should hide all filter buttons after clearing filters", () => {
      cy.get("button").contains("Clear all filters").click();
      cy.get("[data-testid=selected-filter]").should("not.exist");
    });
  
    // Selected Filters Display
    it("should display selected filters under 'Selected Filters'", () => {
      cy.get("[data-testid=sponsored-button]").click();
      cy.get("[data-testid=sponsored-dropdown]").should("be.visible");
      cy.get("[data-testid=sponsored-option]").first().click();
      cy.get("[data-testid=selected-filter]").should("exist");
    });
  
    it("should remove a filter when clicking '✕' next to it", () => {
      cy.get("[data-testid=sponsored-button]").click();
      cy.get("[data-testid=sponsored-dropdown]").should("be.visible");
      cy.get("[data-testid=sponsored-option]").first().click();
      cy.get("[data-testid=selected-filter]").should("exist");
  
      cy.get("[data-testid=remove-filter]").first().click();
      cy.get("[data-testid=selected-filter]").should("not.exist");
    });
  
  
    it("should expand to show all filters when 'Show All' is clicked", () => {
      cy.intercept('GET', '**/multi-state-departments*').as('fetchSchemes');

      cy.get('[data-testid=sponsored-button]').click();
      cy.get('[data-testid=sponsored-dropdown]').should('be.visible');
      cy.get('[data-testid=sponsored-option]').eq(2).click({force:true});
      cy.wait(10000)
      cy.get('[data-testid=sponsored-state]').each(($el) => {
        cy.wrap($el).click();
      });

      cy.contains('button', 'Show All').click();
      cy.get('[data-testid=selected-filter]').should('have.length.greaterThan', 3);
      cy.contains('button', 'Show Less').click();
      cy.get('[data-testid=selected-filter]').should('have.length', 3);
    });
  });
  