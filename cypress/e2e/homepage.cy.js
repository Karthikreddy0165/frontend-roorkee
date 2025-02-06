describe('Home Page Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    // Header and Main Content Tests
    describe('Header and Main Content', () => {
      it('should display main heading correctly', () => {
        cy.get('h1').first()
          .should('contain', 'Empowering the marginalized community');
      });
  
      it('should display subheading text', () => {
        cy.contains('Helping all communities across India find personalized schemes, jobs, and scholarships based on eligibility.')
          .should('be.visible');
      });
  
      it('should show "Get Started" button when not logged in', () => {
        cy.get('button')
          .contains('Get Started')
          .should('be.visible');
      });
  
      it('should navigate to login page when clicking Get Started', () => {
        cy.get('button')
          .contains('Get Started')
          .click();
        cy.url().should('include', '/login');
      });
    });
  
    // Stats Section Tests
    describe('Stats Section', () => {
      it('should display all three stats sections', () => {
        cy.contains('Thousands of schemes').should('be.visible');
        cy.contains('100+ job postings').should('be.visible');
        cy.contains('Multiple scholarships').should('be.visible');
      });
    });
  
    // How It Works Section Tests
    describe('How It Works Section', () => {
      it('should display "HOW IT WORKS" section heading', () => {
        cy.contains('HOW IT WORKS').should('be.visible');
      });
  
      it('should display all three steps', () => {
        cy.contains('Step 1').should('be.visible');
        cy.contains('Step 2').should('be.visible');
        cy.contains('Step 3').should('be.visible');
      });
  
      it('should display step descriptions', () => {
        cy.contains('Tell Us About Yourself').should('be.visible');
        cy.contains('We will find the best results for you').should('be.visible');
        cy.contains('Apply to best-suited results').should('be.visible');
      });
  
      it('should have "Find the Right scheme for me" button', () => {
        cy.contains('Find the Right scheme for me')
          .should('be.visible')
          .click();
        cy.url().should('include', '/Modals/PreferencesModal');
      });
    });
  
    // Resource Categories Tests
    describe('Resource Categories', () => {
      it('should display all three resource categories', () => {
        cy.contains('SCHEMES').should('be.visible');
        cy.contains('JOBS').should('be.visible');
        cy.contains('SCHOLARSHIPS').should('be.visible');
      });
  
      it('should navigate to correct page when clicking Schemes', () => {
        cy.contains('SCHEMES').click();
        cy.url().should('include', '/AllSchemes?tab=schemes');
      });
  
      it('should navigate to correct page when clicking Jobs', () => {
        cy.contains('JOBS').click();
        cy.url().should('include', '/AllSchemes?tab=jobs');
      });
  
      it('should navigate to correct page when clicking Scholarships', () => {
        cy.contains('SCHOLARSHIPS').click();
        cy.url().should('include', '/AllSchemes?tab=scholarships');
      });
    });
  
    // Mission, Vision, and Values Tests
    describe('Mission, Vision, and Values Section', () => {
      it('should display Mission section', () => {
        cy.contains('Mission').should('be.visible');
        cy.contains('Spread the feeling of harmony').should('be.visible');
      });
  
      it('should display Vision section', () => {
        cy.contains('Vision').should('be.visible');
        cy.contains('To be a significant contributor').should('be.visible');
      });
  
      it('should display Values section', () => {
        cy.contains('Our Values').should('be.visible');
        cy.contains('Commitment to the Ideology').should('be.visible');
        cy.contains('Positivity in every action').should('be.visible');
        cy.contains('Transparency in all the activities').should('be.visible');
        cy.contains('Being unbiased in our studies and research').should('be.visible');
        cy.contains('Meaningful contribution').should('be.visible');
      });
    });
  
    // Authenticated User Tests
    describe('Authenticated User View', () => {
      beforeEach(() => {
        cy.window().then((win) => {
          win.localStorage.setItem('token', 'fake-token');
        });
        cy.reload();
      });
  
      it('should show "My Schemes" button when logged in', () => {
        cy.get('button')
          .contains('My Schemes')
          .should('be.visible');
      });
  
      it('should navigate to schemes page when clicking My Schemes', () => {
        cy.get('button')
          .contains('My Schemes')
          .click();
        cy.url().should('include', '/AllSchemes');
      });
    });
  
    // Responsive Design Tests
    describe('Responsive Design', () => {
      it('should display mobile layout on small screens', () => {
        cy.viewport('iphone-6');
        cy.get('button')
          .contains('Get Started')
          .should('be.visible');
      });
  
      it('should display desktop layout on large screens', () => {
        cy.viewport('macbook-15');
        cy.get('.steps')
          .should('have.class', 'lg:grid-cols-3');
      });
    });
  });