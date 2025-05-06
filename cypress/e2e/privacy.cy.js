const expectLocalStorage = (expected) => {
  cy.window().then((win) => {
    console.log(JSON.parse(win.localStorage.getItem('privacyPreferences')))
    const prefs = JSON.parse(win.localStorage.getItem('privacyPreferences'));
    console.log(prefs, "I am prefs")
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
    cy.login()
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
