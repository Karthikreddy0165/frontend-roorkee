describe('signup Page Tests', () => {
    beforeEach(() => {
      cy.visit('/Signup');
    });
  
    it('Should display the signup page', () => {
      cy.get('form').should('be.visible');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('Should not log in with invalid credentials', () => {
      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      // Check for error message
      cy.get('.error-message')
        .should('be.visible')
        .and('contain', 'Invalid email or password');
    });
  
    it('Should log in with valid credentials', () => {
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('correctpassword');
      cy.get('button[type="submit"]').click();
  
      // Check for successful navigation after login
      cy.url().should('include', '/dashboard');
      cy.get('.welcome-message')
        .should('be.visible')
        .and('contain', 'Welcome, Test User');
    });
  
    it('Should show validation messages for empty fields', () => {
      cy.get('button[type="submit"]').click();
  
      // Check for validation errors
      cy.get('.validation-error')
        .should('have.length', 2) // Assuming there are two fields: email and password
        .each(($el) => {
          expect($el).to.be.visible;
          expect($el.text()).to.match(/This field is required/);
        });
    });
  
    it('Should not allow submission with invalid email format', () => {
      cy.get('input[name="email"]').type('invalidemail');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
  
      // Check for email format error
      cy.get('.validation-error')
        .should('be.visible')
        .and('contain', 'Please enter a valid email');
    });
  });
  