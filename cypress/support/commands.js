/// <reference types="cypress" />
/// <reference types="cypress" />
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