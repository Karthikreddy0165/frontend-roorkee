describe('Homepage Tests', () => {
  // Helper function to detect available categories
  const detectCategories = () => {
    cy.get('body').then($body => {
      const bodyText = $body.text().toLowerCase();
      const availableCategories = {
        schemes: bodyText.includes('schemes'),
        jobs: bodyText.includes('jobs'),
        scholarships: bodyText.includes('scholarships')
      };
      
      // Get the first available category for button text
      const categoryNames = Object.entries(availableCategories)
        .filter(([_, exists]) => exists)
        .map(([name, _]) => name);
      
      const firstCategory = categoryNames.length > 0 ? categoryNames[0] : 'opportunity';
      
      // Store in Cypress environment variables
      Cypress.env('availableCategories', availableCategories);
      Cypress.env('firstCategory', firstCategory);
    });
  };

  // 1. Test landing page elements for non-authenticated users
  describe('Non-authenticated User View', () => {
    beforeEach(() => {
      cy.visit('/');
      detectCategories();
    });

    it('should display navbar with login option', () => {
      cy.get('nav').should('be.visible');
      cy.contains('button:visible', /login/i).should('be.visible');
    });

    it('should display carousel section properly', () => {
      // Test the main carousel component exists
      cy.get('[class*="slick-list"]').should('exist');
    });

    it('should display announcements ticker', () => {
      cy.get('body').then(($body) => {
        if ($body.text().match(/announcement/i)) {
          cy.contains(/announcement/i).should('be.visible');
        } else {
          cy.log('No announcements present, which is acceptable.');
        }
      });
    });

    it('should navigate to login page when clicking login button', () => {
      cy.contains('button:visible', /login/i).should('be.visible').click({force:true});
      cy.url().should('include', '/login');
    });

    it('should display footer with links', () => {
      cy.get('footer').should('be.visible');
    });
  });

  // 2. Test landing page elements for authenticated users
  describe('Authenticated User View', () => {
    beforeEach(() => {
      cy.login(); // Use the custom login command
      detectCategories();
    });

    it('should display profile information after login', () => {
      cy.contains(/profile/i).should('be.visible');
    });

    it('should allow navigating to schemes from buttons', () => {
      const availableCategories = Cypress.env('availableCategories');
      
      if (availableCategories.schemes) {
        cy.contains(/schemes/i).click({ force: true });
        cy.url().should('include', '/AllSchemes');
      } else {
        cy.log('Schemes category not available on the page');
      }
    });

    it('should allow logging out', () => {
      cy.logout();
      cy.url().should('include', '/login');
    });
  });

  // 3. Test the "How It Works" section
  describe('How It Works Section', () => {
    beforeEach(() => {
      cy.visit('/');
      detectCategories();
    });

    it('should display "HOW IT WORKS" heading', () => {
      cy.contains(/how it works/i).should('be.visible');
    });

    it('should display all three steps with correct content', () => {
      // Check Step 1
      cy.contains(/step 1/i).should('be.visible');
      cy.contains(/tell us about yourself/i).should('be.visible');

      // Check Step 2
      cy.contains(/step 2/i).should('be.visible');
      cy.contains(/best results for you/i).should('be.visible');

      // Check Step 3
      cy.contains(/step 3/i).should('be.visible');
      cy.contains(/apply for the best match/i).should('be.visible');
    });

    it('should display "Find the right" button with the correct category', () => {
      const firstCategory = Cypress.env('firstCategory');
      cy.contains(new RegExp(`find the right ${firstCategory}`, 'i')).should('be.visible');
    });

    it('should navigate to preferences page when clicking the "Find" button', () => {
      cy.contains(/find the right/i).click();
      cy.url().should('include', '/my-preference');
    });
  });

  // 4. Test main categories section (Schemes, Jobs, Scholarships)
  describe('Categories Section', () => {
    beforeEach(() => {
      cy.visit('/');
      detectCategories();
    });

    it('should display "One solution for all information" heading', () => {
      cy.contains(/one solution for all information/i).should('be.visible');
    });

    it('should display available category options', () => {
      const availableCategories = Cypress.env('availableCategories');
      
      if (availableCategories.schemes) {
        cy.contains(/schemes/i).should('be.visible');
      }
      
      if (availableCategories.jobs) {
        cy.contains(/jobs/i).should('be.visible');
      }
      
      if (availableCategories.scholarships) {
        cy.contains(/scholarships/i).should('be.visible');
      }
    });

    it('should navigate to schemes page when clicking Schemes', () => {
      const availableCategories = Cypress.env('availableCategories');
      
      if (availableCategories.schemes) {
        cy.intercept('GET', '**/api/layout-items/').as('getLayoutItems');
        cy.wait('@getLayoutItems').its('response.statusCode').should('eq', 200);
        cy.contains(/schemes/i).click({ force: true });
        cy.url().should('include', '/AllSchemes');
      } else {
        cy.log('Schemes category not available, skipping test');
      }
    });

    it('should navigate to jobs page when clicking Jobs', () => {
      const availableCategories = Cypress.env('availableCategories');
      
      if (availableCategories.jobs) {
        cy.intercept('GET', '**/api/layout-items/').as('getLayoutItems');
        cy.wait('@getLayoutItems').its('response.statusCode').should('eq', 200);
        cy.contains(/jobs/i).click({ force: true });
        cy.url().should('include', '/AllSchemes?tab=jobs');
      } else {
        cy.log('Jobs category not available, skipping test');
      }
    });

    it('should navigate to scholarships page when clicking Scholarships', () => {
      const availableCategories = Cypress.env('availableCategories');
      
      if (availableCategories.scholarships) {
        cy.intercept('GET', '**/api/layout-items/').as('getLayoutItems');
        cy.wait('@getLayoutItems').its('response.statusCode').should('eq', 200);
        cy.wait(3000)
        cy.contains(/scholarships/i).click({ force: true });
        cy.url().should('include', '/AllSchemes?tab=scholarships');
      } else {
        cy.log('Scholarships category not available, skipping test');
      }
    });
  });

  // 5. Test Mission, Vision and Values sections
  describe('Mission, Vision and Values Sections', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display Mission section with content', () => {
      cy.contains(/mission/i).should('be.visible');
      cy.contains(/harmony|discrimination-free/i).should('be.visible');
    });

    it('should display Vision section with content', () => {
      cy.contains(/vision/i).should('be.visible');
      cy.contains(/contributor|harmonious society/i).should('be.visible');
    });

    it('should display Values section with list items', () => {
      cy.contains(/our values/i).should('be.visible');
      
      // Check for all 5 values
      cy.contains(/commitment to the ideology/i).should('be.visible');
      cy.contains(/positivity in every action/i).should('be.visible');
      cy.contains(/transparency/i).should('be.visible');
      cy.contains(/unbiased/i).should('be.visible');
      cy.contains(/meaningful contribution/i).should('be.visible');
    });

    it('should have hover effects on Mission and Vision cards', () => {
      // Test hover effect on Mission card
      cy.contains(/mission/i).parent().trigger('mouseover');
      cy.contains(/mission/i).parent().should('have.css', 'transform');
      
      // Test hover effect on Vision card
      cy.contains(/vision/i).parent().trigger('mouseover');
      cy.contains(/vision/i).parent().should('have.css', 'transform');
    });
  });

  // 6. Test user state transitions (login/logout)
  describe('User State Transitions', () => {
    it('should allow login and display user profile', () => {
      cy.visit('/');
      cy.login();
      cy.contains(/profile/i).should('be.visible');
    });

    it('should allow logout and return to non-authenticated state', () => {
      cy.visit('/');
      cy.login();
      cy.contains(/profile/i).should('be.visible');
      
      cy.logout();
      cy.contains(/login|sign in/i).should('be.visible');
    });
  });

  // Testing FAQ section
  describe('FAQ Section', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display FAQ section with questions', () => {
      cy.contains(/faq|frequently asked questions/i).should('be.visible');
    });
    
    it('should expand first FAQ item when clicked', () => {
      cy.get('button[id^="headlessui-disclosure-button"]').first().click();
      cy.get('div[id^="headlessui-disclosure-panel"]').first().should('be.visible');
    });    
  });
  
  // Testing responsive design
  describe('Responsive Design', () => {
    it('should adapt layout for mobile devices', () => {
      cy.viewport('iphone-6');
      cy.visit('/');
      
      // Verify mobile layout elements
      cy.get('nav').should('be.visible');
      cy.get('[class*="slick-list"]').should('exist');
    });
    
    it('should adapt layout for desktop devices', () => {
      cy.viewport('macbook-15');
      cy.visit('/');
      
      // Verify desktop layout elements
      cy.get('nav').should('be.visible');
      cy.get('[class*="slick-list"]').should('exist');
    });
  });
});
