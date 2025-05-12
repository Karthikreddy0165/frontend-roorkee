Cypress.Commands.add('login', (email = 'test@example.com', password = 'password1231') => {
  const apiUrl = Cypress.env('apiUrl');
  cy.request({
    method: 'POST',
    url: `${apiUrl}/api/login/`,
    body: {
      email,
      password,
    },
  }).then((res) => {
    expect(res.status).to.eq(200);

    cy.visit('/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.contains('button', 'Sign In').click();

    cy.wait(1000);
    cy.visit('/');
  });
});

Cypress.Commands.add('logout',()=>{
  cy.contains('Profile ').click()
  cy.contains('Log Out').click()
})

// Scheme component test commands
Cypress.Commands.add('getSchemeCount', () => {
  return cy.get('div.test').contains(/Found \d+ schemes/i).then($el => {
    const text = $el.text();
    const match = text.match(/Found (\d+) schemes/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return 0;
  });
});

Cypress.Commands.add('checkTabContent', (tabName) => {
  // Intercept the API request
  cy.intercept('POST', '**/api/schemes/multi-state-departments/**').as('tabContentRequest');
  
  // Click on the tab
  cy.get('div[role="tablist"]').contains(tabName).click();
  
  // Wait for the API response
  cy.wait('@tabContentRequest', { timeout: 15000 });
  
  // Verify the content is loaded
  cy.get('div[role="tabpanel"]').should('be.visible');
  cy.get('div[role="tabpanel"] div.cursor-pointer').should('exist');
});

Cypress.Commands.add('searchSchemes', (searchTerm) => {
  // Intercept the API request
  cy.intercept('POST', '**/api/schemes/multi-state-departments/**').as('searchRequest');
  
  // Enter search term in search box
  cy.get('input[type="text"], input[placeholder*="Search"]').clear().type(searchTerm);
  
  // Wait for debounce and API response
  cy.wait(1000); // Wait for debounce
  cy.wait('@searchRequest', { timeout: 15000 });
  
  // Verify the search results are loaded
  cy.get('div[role="tabpanel"]').should('be.visible');
});

Cypress.Commands.add('checkSchemeDetails', (schemeIndex = 0) => {
  // Get the scheme at the specified index
  cy.get('div[role="tabpanel"] div.cursor-pointer').eq(schemeIndex).within(() => {
    // Check for common scheme information fields
    cy.get('div').should('exist'); // Scheme name
    
    // Look for typical scheme details
    cy.get('div').then($divs => {
      // Log key details found
      cy.log(`Found ${$divs.length} detail elements in scheme card`);
      
      // Check for common elements
      const text = $divs.text();
      cy.log(`Scheme card text: ${text.substring(0, 100)}...`);
    });
  });
});

Cypress.Commands.add('verifyMobileResponsiveness', () => {
  // Switch to mobile viewport
  cy.viewport('iphone-x');
  
  // Check that the filter button is visible on mobile
  cy.get('div.md\\:hidden button').contains('Filter').should('be.visible');
  
  // Check that the desktop filter sidebar is hidden
  cy.get('div.flex-1.md\\:max-w-\\[25\\%\\].hidden.md\\:block').should('not.be.visible');
  
  // Click the filter button to open filter modal
  cy.get('div.md\\:hidden button').contains('Filter').click();
  
  // Verify modal appears
  cy.get('div.fixed.inset-0').should('be.visible');
  
  // Close the modal
  cy.contains('Close').click();
  
  // Reset viewport
  cy.viewport('macbook-15');
});

// Schemes component test commands
Cypress.Commands.add('waitForSchemesApi', () => {
  cy.intercept('POST', '**/api/schemes/multi-state-departments/**').as('schemesApiRequest');
  cy.wait('@schemesApiRequest', { timeout: 10000 });
});

Cypress.Commands.add('getSchemeCount', () => {
  return cy.get('div.test').contains(/Found \d+ schemes/i).then($el => {
    const text = $el.text();
    const match = text.match(/Found (\d+) schemes/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return 0;
  });
});

Cypress.Commands.add('applyFilter', (filterType, value) => {
  // Intercept API request that will be made when filter is applied
  cy.intercept('POST', '**/api/schemes/multi-state-departments/**').as('filterApiRequest');
  
  // Open filter dropdown
  cy.contains(filterType).click();
  
  // Select the filter value
  cy.contains(value).click();
  
  // Wait for API request to complete
  cy.wait('@filterApiRequest', { timeout: 10000 });
  
  // Wait for UI to update
  cy.get('div[role="tabpanel"]').should('be.visible');
});

Cypress.Commands.add('clearAllFilters', () => {
  // Intercept API request that will be made when filters are cleared
  cy.intercept('POST', '**/api/schemes/multi-state-departments/**').as('clearFiltersRequest');
  
  cy.contains('Clear all filters').click();
  
  // Wait for API request to complete
  cy.wait('@clearFiltersRequest', { timeout: 10000 });
  
  // Wait for UI to update
  cy.get('div[role="tabpanel"]').should('be.visible');
});

Cypress.Commands.add('changeSortOrder', (sortOption) => {
  // Intercept API request that will be made when sort order changes
  cy.intercept('POST', '**/api/schemes/multi-state-departments/**').as('sortRequest');
  
  cy.get('div.sorting select').then($select => {
    if ($select.length) {
      // If it's a select element
      cy.wrap($select).select(sortOption);
    } else {
      // If it's a custom dropdown
      cy.get('div.sorting').click();
      cy.contains(sortOption).click();
    }
    
    // Wait for API request to complete
    cy.wait('@sortRequest', { timeout: 10000 });
    
    // Wait for UI to update
    cy.get('div[role="tabpanel"]').should('be.visible');
  });
});

Cypress.Commands.add('checkSchemeCount', () => {
  cy.get('div.test').contains(/Found \d+ schemes/i).should('be.visible')
    .then($el => {
      const text = $el.text();
      cy.log(`Scheme count text: ${text}`);
    });
});

Cypress.Commands.add('navigateToNextPage', () => {
  // Intercept API request that will be made when navigating to next page
  cy.intercept('POST', '**/api/schemes/multi-state-departments/**').as('pageNavigationRequest');
  
  cy.contains('button', 'Next').click();
  
  // Wait for API request to complete
  cy.wait('@pageNavigationRequest', { timeout: 10000 });
  
  // Wait for UI to update
  cy.get('div[role="tabpanel"]').should('be.visible');
});
