/// <reference types="cypress" />
Cypress.Commands.add('login', (email = 'test@example.com', password = 'password1231') => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/login/`, {
      statusCode: 200,
      body: {
        access: 'fake-jwt-token'
      }
    }).as('loginRequest')
  
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.contains('button', 'Continue').click()
  
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        email: email.toLowerCase(),
        password: password
      })
    })
  })
  