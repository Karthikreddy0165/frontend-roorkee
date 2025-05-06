describe('Terms and Conditions Page', () => {
    beforeEach(() => {
      cy.visit('/Terms-conditions'); 
    });
  
    it('loads successfully', () => {
      cy.contains('Terms and Conditions').should('exist');
    });
  
    it('has all 12 sections', () => {
      const sections = [
        'Acceptance of Terms',
        'Services Provided',
        'User Account',
        'Use of the Portal',
        'User Responsibilities',
        'Privacy and Data Collection',
        'Disclaimers',
        'Limitation of Liability',
        'Intellectual Property',
        'Modification of Terms',
        'Termination of Account',
        'Governing Law'
      ];
  
      sections.forEach((title) => {
        cy.contains(title).should('exist');
      });
    });
  
    it('has a working back button', () => {
      // Simulate browser history for back button
      cy.visit('/');
      cy.visit('/Terms-conditions');
      cy.get('svg').first().click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  
    it('displays navbar and footer', () => {
      cy.get('nav').should('exist'); 
      cy.get('footer').should('exist'); 
    });
  });
  