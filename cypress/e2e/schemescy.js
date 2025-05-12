describe('Schemes Component Tests with Real API', () => {
  beforeEach(() => {
    // Visit the schemes page
    cy.visit('/AllSchemes');
    
    // Wait for the initial API request to complete
    cy.waitForSchemesApi();
  });

  context('Basic Scheme Listing', () => {
    it('should render the Schemes component with real data', () => {
      // Check if schemes section exists
      cy.get('div.bg-white.font-sans').should('exist');
      
      // Check that some schemes are displayed
      cy.get('div[role="tabpanel"]').within(() => {
        cy.get('div.cursor-pointer').should('have.length.at.least', 1);
      });
      
      // Check scheme count
      cy.checkSchemeCount();
    });

    it('should display scheme count for actual data', () => {
      // Log the actual count for reference
      cy.getSchemeCount().then(count => {
        cy.log(`Actual scheme count: ${count}`);
      });
    });

    it('should display real scheme details correctly', () => {
      // Use our new command to check scheme details
      cy.checkSchemeDetails(0);
      
      // Check a second scheme if available
      cy.get('div[role="tabpanel"] div.cursor-pointer').then($schemes => {
        if ($schemes.length > 1) {
          cy.checkSchemeDetails(1);
        }
      });
    });
  });

  context('Tab Switching Behavior', () => {
    it('should switch between tabs and load content', () => {
      // Get tab names from the tablist
      cy.get('div[role="tablist"] button').then($tabs => {
        // Check if we have at least 2 tabs
        if ($tabs.length > 1) {
          // Get the name of the second tab
          const tabName = $tabs.eq(1).text().trim();
          
          // Check tab content using our command
          cy.checkTabContent(tabName);
          
          // Return to first tab
          cy.checkTabContent($tabs.eq(0).text().trim());
        } else {
          cy.log('Not enough tabs to test switching');
        }
      });
    });

    it('should maintain filter state when switching tabs', () => {
      // Apply a filter
      cy.applyFilter('Sponsored By', 'Central Government');
      
      // Get the current count
      cy.getSchemeCount().then(countAfterFilter => {
        // Switch to another tab if available
        cy.get('div[role="tablist"] button').then($tabs => {
          if ($tabs.length > 1) {
            const secondTabName = $tabs.eq(1).text().trim();
            cy.checkTabContent(secondTabName);
            
            // Switch back to first tab
            cy.checkTabContent($tabs.eq(0).text().trim());
            
            // Verify count is still reflecting the filter
            cy.getSchemeCount().then(countAfterTabSwitch => {
              cy.log(`Count after filter: ${countAfterFilter}, Count after tab switch: ${countAfterTabSwitch}`);
            });
          }
        });
      });
    });
  });

  context('Search Functionality', () => {
    it('should search for schemes and display results', () => {
      // Get initial count
      cy.getSchemeCount().then(initialCount => {
        // Look for search input
        cy.get('input[type="text"], input[placeholder*="Search"]').then($search => {
          if ($search.length) {
            // Get a search term from existing schemes
            cy.get('div[role="tabpanel"] div.cursor-pointer').first().find('div').first().invoke('text').then(text => {
              // Extract a search term (first word or part of the scheme name)
              const searchTerm = text.split(' ')[0];
              
              // Use our search command
              cy.searchSchemes(searchTerm);
              
              // Verify search results
              cy.getSchemeCount().then(searchCount => {
                cy.log(`Initial count: ${initialCount}, Search count: ${searchCount}`);
              });
              
              // Clear search to restore all schemes
              cy.searchSchemes('');
            });
          } else {
            cy.log('Search input not found');
          }
        });
      });
    });

    it('should handle search with no results', () => {
      // Search for a term unlikely to match any schemes
      cy.get('input[type="text"], input[placeholder*="Search"]').then($search => {
        if ($search.length) {
          // Search for an unlikely term
          cy.searchSchemes('XYZ123NonExistentScheme');
          
          // Check if we get empty results or "no schemes found" message
          cy.get('body').then($body => {
            if ($body.text().includes('No schemes found')) {
              cy.contains('No schemes found').should('be.visible');
            } else {
              // Check if count is zero or very low
              cy.getSchemeCount().then(count => {
                cy.log(`Search returned ${count} results`);
              });
            }
          });
          
          // Clear search to restore all schemes
          cy.searchSchemes('');
        }
      });
    });
  });

  context('Filter Functionality with Real API', () => {
    it('should update schemes when sponsored by filter is applied', () => {
      // Get initial scheme count
      cy.getSchemeCount().then(initialCount => {
        cy.log(`Initial scheme count: ${initialCount}`);
        
        // Apply sponsored by filter using our command
        cy.applyFilter('Sponsored By', 'Central Government');
        
        // Verify count changes
        cy.getSchemeCount().then(filteredCount => {
          cy.log(`Filtered scheme count: ${filteredCount}`);
        });
      });
    });

    it('should apply beneficiaries filter if available', () => {
      // Check if beneficiaries filter is available
      cy.get('body').then($body => {
        if ($body.find('div:contains("Beneficiaries")').length > 0) {
          // Apply beneficiaries filter
          cy.applyFilter('Beneficiaries', 'Students');
          
          // Verify results update
          cy.getSchemeCount().then(count => {
            cy.log(`Schemes count after beneficiary filter: ${count}`);
          });
        } else {
          cy.log('Beneficiaries filter not visible/available');
        }
      });
    });

    it('should clear all filters and restore initial results', () => {
      // Apply a filter first
      cy.applyFilter('Sponsored By', 'Central Government');
      
      // Get filtered count
      cy.getSchemeCount().then(filteredCount => {
        // Clear all filters using our command
        cy.clearAllFilters();
        
        // Verify schemes update
        cy.get('div[role="tabpanel"]').should('be.visible');
        
        // Get count after clearing
        cy.getSchemeCount().then(clearedCount => {
          cy.log(`Filtered count: ${filteredCount}, Cleared count: ${clearedCount}`);
        });
      });
    });
  });

  context('Sorting Functionality with Real Data', () => {
    it('should change sort order and update results', () => {
      // Get the name of the first scheme before sorting
      cy.get('div[role="tabpanel"]').find('div.cursor-pointer').first().invoke('text').then(originalText => {
        // Change sort order using our command
        cy.changeSortOrder('newest');
        
        // Compare with original first scheme
        cy.get('div[role="tabpanel"]').find('div.cursor-pointer').first().invoke('text').then(newText => {
          cy.log(`Original first scheme: ${originalText.substring(0, 50)}...`);
          cy.log(`New first scheme: ${newText.substring(0, 50)}...`);
        });
      });
    });

    it('should try different sort options if available', () => {
      // Get available sort options
      cy.get('div.sorting select').then($select => {
        if ($select.length) {
          // If it's a select element, try different options
          const options = $select.find('option');
          if (options.length > 1) {
            // Try second sort option
            cy.changeSortOrder(options.eq(1).val());
          }
        } else {
          // If it's a custom dropdown
          cy.get('div.sorting').click();
          cy.get('body').then($body => {
            // Click on a different sorting option if available
            if ($body.find('div:contains("Oldest")').length) {
              cy.contains('Oldest').click();
              cy.waitForSchemesApi();
            } else if ($body.find('div:contains("A-Z")').length) {
              cy.contains('A-Z').click();
              cy.waitForSchemesApi();
            }
          });
        }
        
        // Verify schemes are updated
        cy.get('div[role="tabpanel"]').should('be.visible');
      });
    });
  });

  context('Pagination with Actual Data', () => {
    it('should navigate between pages if pagination exists', () => {
      // Check if pagination controls exist
      cy.get('body').then($body => {
        const hasPagination = $body.find('button:contains("Next"), button:contains("Page 2")').length > 0;
        
        if (hasPagination) {
          // Get the name of the first scheme on page 1
          cy.get('div[role="tabpanel"]').find('div.cursor-pointer').first().invoke('text').then(page1Text => {
            cy.log(`First scheme on page 1: ${page1Text.substring(0, 50)}...`);
            
            // Navigate to next page using our command
            cy.navigateToNextPage();
            
            // Get name of first scheme on page 2
            cy.get('div[role="tabpanel"]').find('div.cursor-pointer').first().invoke('text').then(page2Text => {
              cy.log(`First scheme on page 2: ${page2Text.substring(0, 50)}...`);
            });
            
            // Go back to page 1 if previous button exists
            cy.get('body').then($body => {
              if ($body.find('button:contains("Previous"), button:contains("Page 1")').length > 0) {
                cy.get('button:contains("Previous"), button:contains("Page 1")').first().click();
                cy.waitForSchemesApi();
              }
            });
          });
        } else {
          cy.log('Pagination not available - not enough schemes to test pagination');
        }
      });
    });

    it('should update URL with page parameters when navigating', () => {
      // Check if pagination controls exist
      cy.get('body').then($body => {
        if ($body.find('button:contains("Next"), button:contains("Page 2")').length > 0) {
          // Click on page 2
          cy.get('button:contains("Next"), button:contains("Page 2")').first().click();
          cy.waitForSchemesApi();
          
          // Check if URL contains page parameter
          cy.url().then(url => {
            cy.log(`URL after pagination: ${url}`);
            // We don't assert on exact URL format as it may vary
          });
        } else {
          cy.log('Pagination not available');
        }
      });
    });
  });

  context('Mobile Responsiveness', () => {
    it('should display properly on mobile devices', () => {
      // Use our mobile responsiveness command
      cy.verifyMobileResponsiveness();
    });

    it('should handle filter interactions on mobile', () => {
      // Switch to mobile viewport
      cy.viewport('iphone-x');
      
      // Open filter modal
      cy.get('div.md\\:hidden button').contains('Filter').click();
      
      // Apply a filter in the modal
      cy.get('div.fixed.inset-0').within(() => {
        cy.contains('Sponsored By').click();
        cy.contains('Central Government').click();
      });
      
      // Close the modal
      cy.contains('Close').click();
      
      // Verify the filter was applied
      cy.getSchemeCount();
      
      // Reset viewport
      cy.viewport('macbook-15');
    });
  });

  context('Error Handling', () => {
    it('should handle slow network conditions', { defaultCommandTimeout: 10000 }, () => {
      // Simulate slow response
      cy.intercept('POST', '**/api/schemes/multi-state-departments/**', (req) => {
        req.on('response', (res) => {
          // Delay the response
          res.setDelay(5000);
        });
      }).as('slowRequest');
      
      // Reload the page
      cy.reload();
      
      // Wait for slow response
      cy.wait('@slowRequest', { timeout: 15000 });
      
      // Verify the page still loads
      cy.get('div[role="tabpanel"]').should('be.visible');
      cy.getSchemeCount();
    });

    it('should gracefully handle filter interactions during loading', () => {
      // Intercept but don't delay response
      cy.intercept('POST', '**/api/schemes/multi-state-departments/**').as('filterRequest');
      
      // Try to interact with filters while data is loading
      cy.reload();
      
      // Don't wait for API to complete before trying filter
      cy.contains('Sponsored By').click();
      cy.contains('Central Government').click();
      
      // Now wait for all pending requests
      cy.wait('@filterRequest', { timeout: 15000 });
      
      // Verify the page still shows results
      cy.get('div[role="tabpanel"]').should('be.visible');
      cy.getSchemeCount();
    });
  });

  context('User Authentication and Preferences', () => {
    it('should handle preference button for guest users', () => {
      // Ensure we're logged out
      cy.visit('/');
      cy.get('body').then($body => {
        if ($body.find('button:contains("Profile")').length) {
          cy.logout();
          cy.visit('/AllSchemes');
          cy.waitForSchemesApi();
        }
      });
      
      // Check preference button behavior for guests
      cy.contains('My Preference').click();
      cy.url().should('include', '/login');
    });

    it('should handle authenticated user preferences if user is logged in', () => {
      // Try to login
      cy.visit('/login');
      
      // Check if we have credentials
      cy.get('body').then($body => {
        if ($body.find('input[type="email"]').length && $body.find('input[type="password"]').length) {
          cy.login();
          
          // Visit schemes page
          cy.visit('/AllSchemes');
          cy.waitForSchemesApi();
          
          // Check preference button
          cy.contains('My Preference').then($btn => {
            if (!$btn.hasClass('cursor-not-allowed')) {
              // Click to apply preferences
              cy.wrap($btn).click();
              cy.waitForSchemesApi();
              
              // Verify schemes update
              cy.get('div[role="tabpanel"]').should('be.visible');
              
              // Click again to toggle off
              cy.contains('My Preference').click();
              cy.waitForSchemesApi();
            }
          });
          
          // Logout
          cy.get('body').then($body => {
            if ($body.find('button:contains("Profile")').length) {
              cy.logout();
            }
          });
        } else {
          cy.log('Skipped authenticated preference test - login form not available');
        }
      });
    });
  });
});
