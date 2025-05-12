describe("Privacy Policy Page", () => {
  beforeEach(() => {
    cy.visit("/privacy-policy");
    cy.login();
  });

  it("loads the privacy policy page and displays content", () => {
    cy.contains("Privacy Policy").should("be.visible");
    cy.contains("At Empower Hub, we are committed to protecting and respecting your privacy").should("be.visible");
    cy.contains("Consent Preferences").should("be.visible");
    cy.contains("Strictly Necessary Cookies").should("be.visible");
    cy.contains("Always Active").should("be.visible");
  });

  it("toggles consent preferences checkboxes", () => {
    cy.contains("Consent Preferences").should("be.visible");

    // Verify initial state (assuming default is unchecked)
    cy.get('input[type="checkbox"][checked]').should("not.exist");

    // Toggle Cookies & Tracking Technologies
    cy.contains("Cookies & Tracking Technologies").parent().find('input[type="checkbox"]').click();
    cy.contains("Cookies & Tracking Technologies").parent().find('input[type="checkbox"]').should("be.checked");

    // Toggle Information Usage (should also enable Information Sharing)
    cy.contains("Information Usage").parent().find('input[type="checkbox"]').click();
    cy.contains("Information Usage").parent().find('input[type="checkbox"]').should("be.checked");
    cy.contains("Information Sharing").parent().find('input[type="checkbox"]').should("be.checked");

    // Toggle Information Sharing (should also enable Information Usage)
    cy.contains("Information Sharing").parent().find('input[type="checkbox"]').click();
    cy.contains("Information Sharing").parent().find('input[type="checkbox"]').should("not.be.checked");
    cy.contains("Information Usage").parent().find('input[type="checkbox"]').should("not.be.checked");
  });

  it("rejects all consent preferences", () => {
    cy.contains("Consent Preferences").should("be.visible");

    // Enable all checkboxes
    cy.contains("Cookies & Tracking Technologies").parent().find('input[type="checkbox"]').click();
    cy.contains("Information Usage").parent().find('input[type="checkbox"]').click();

    // Click Reject All
    cy.contains("Reject All").click();

    // Verify all relevant checkboxes are unchecked
    cy.contains("Cookies & Tracking Technologies").parent().find('input[type="checkbox"]').should("not.be.checked");
    cy.contains("Information Usage").parent().find('input[type="checkbox"]').should("not.be.checked");
    cy.contains("Information Sharing").parent().find('input[type="checkbox"]').should("not.be.checked");
  });

  it("submits privacy settings successfully when authenticated", () => {
    cy.contains("Consent Preferences").should("be.visible");

    // Toggle some preferences
    cy.contains("Cookies & Tracking Technologies").parent().find('input[type="checkbox"]').click();
    cy.contains("Information Usage").parent().find('input[type="checkbox"]').click();

    // Intercept the API call
    cy.intercept("POST", "**/api/privacy-settings/", {
      statusCode: 200,
      body: { message: "Privacy settings updated" },
    }).as("submitPrivacySettings");

    // Submit the settings
    cy.contains("Submit My Choices").click();
    cy.wait("@submitPrivacySettings");
    cy.contains("Privacy settings updated successfully").should("be.visible");

    // Verify navigation back (assuming router.back() navigates to the previous page)
    cy.url().should("not.include", "/privacy-policy");
  });

  it("shows error when submitting privacy settings without authentication", () => {
    cy.logout(); // Assumes a custom logout command
    cy.visit("/privacy-policy");

    cy.contains("Consent Preferences").should("be.visible");

    // Toggle a preference
    cy.contains("Cookies & Tracking Technologies").parent().find('input[type="checkbox"]').click();

    // Submit without being logged in
    cy.contains("Submit My Choices").click();
    cy.contains("Please login to update privacy settings").should("be.visible");
  });

  it("closes the privacy policy page using the close button", () => {
    cy.contains("Privacy Policy").should("be.visible");

    // Click the close button (visible on md and larger screens)
    cy.get("button").filter('[data-icon="close"]').click();

    // Verify navigation back
    cy.url().should("not.include", "/privacy-policy");
  });

  it("verifies Strictly Necessary Cookies are always active", () => {
    cy.contains("Consent Preferences").should("be.visible");
    cy.contains("Strictly Necessary Cookies").parent().contains("Always Active").should("be.visible");

    // Ensure no checkbox exists for Strictly Necessary Cookies
    cy.contains("Strictly Necessary Cookies").parent().find('input[type="checkbox"]').should("not.exist");
  });

  // LocalStorage Tests
  const expectLocalStorage = (expected) => {
    cy.window().then((win) => {
      const prefs = JSON.parse(win.localStorage.getItem('privacyPreferences'));
      expect(prefs).to.deep.equal(expected);
    });
  };

  // Utility to toggle a preference by label
  const togglePreference = (label) => {
    cy.contains(label)
      .parent()
      .find('input[type="checkbox"]')
      .parent()
      .click();
  };

  // Utility to check toggle state
  const checkToggleState = (label, shouldBeChecked) => {
    cy.contains(label)
      .parent()
      .find('input[type="checkbox"]')
      .should(shouldBeChecked ? 'be.checked' : 'not.be.checked');
  };

  describe('Privacy Preferences E2E', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/');
    });

    it('privacyPreferences should be true by default', () => {
      cy.login();
      cy.visit('/privacy-policy');
      cy.contains('Submit My Choices').click();

      expectLocalStorage({
        cookiesConsent: true,
        infoUsage: true,
        infoSharing: true
      });
    });

    it('should save preferences correctly when set through the modal', () => {
      cy.contains('Privacy').click();

      togglePreference('Cookies & Tracking Technologies');
      togglePreference('Information Usage');

      cy.contains('Submit My Choices').click();
      cy.get('[data-testid="privacy-modal-content"]').should('not.exist');

      expectLocalStorage({
        cookiesConsent: true,
        infoUsage: true,
        infoSharing: false
      });
    });

    it('should set all preferences to false when clicking Reject All', () => {
      cy.contains('Privacy').click();

      togglePreference('Cookies & Tracking Technologies');
      togglePreference('Information Usage');
      togglePreference('Information Sharing');

      cy.contains('Reject All').click();

      checkToggleState('Cookies & Tracking Technologies', false);
      checkToggleState('Information Usage', false);
      checkToggleState('Information Sharing', false);

      cy.contains('Submit My Choices').click();

      expectLocalStorage({
        cookiesConsent: false,
        infoUsage: false,
        infoSharing: false
      });
    });

    it('should load saved preferences from localStorage when reopening modal', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('privacyPreferences', JSON.stringify({
          cookiesConsent: true,
          infoUsage: false,
          infoSharing: true
        }));
      });

      cy.reload();
      cy.contains('Privacy').click();

      checkToggleState('Cookies & Tracking Technologies', true);
      checkToggleState('Information Usage', false);
      checkToggleState('Information Sharing', true);
    });

    it('should work properly on the privacy policy page', () => {
      cy.visit('/privacy-policy');

      togglePreference('Cookies & Tracking Technologies');
      togglePreference('Information Sharing');

      cy.window().then((win) => {
        expect(win.localStorage.getItem('privacyPreferences')).to.be.null;
      });

      cy.contains('Submit My Choices').click();
      cy.url().should('not.include', '/privacy-policy');

      expectLocalStorage({
        cookiesConsent: true,
        infoUsage: false,
        infoSharing: true
      });
    });

    it('should handle "Reject All" correctly on privacy policy page', () => {
      cy.visit('/privacy-policy');

      togglePreference('Cookies & Tracking Technologies');
      togglePreference('Information Usage');
      togglePreference('Information Sharing');

      cy.contains('Reject All').click();

      checkToggleState('Cookies & Tracking Technologies', false);
      checkToggleState('Information Usage', false);
      checkToggleState('Information Sharing', false);

      cy.contains('Submit My Choices').click();

      expectLocalStorage({
        cookiesConsent: false,
        infoUsage: false,
        infoSharing: false
      });
    });

    it('has a working back button', () => {
      // Simulate browser history for back button
      cy.visit('/');
      cy.visit('/privacy-policy');
      cy.get('svg').first().click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('displays navbar and footer', () => {
      cy.get('nav').should('exist');
      cy.get('footer').should('exist');
    });
  });
});
