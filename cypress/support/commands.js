/// <reference types="cypress" />
Cypress.Commands.add('login', (email = 'test@example.com', password = 'password1231') => {

    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/login/`, {
      statusCode: 200,
      body: {
        access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2MTAwOTA5LCJpYXQiOjE3NDUyMzY5MDksImp0aSI6ImIxYjU1MzEwN2U2YjQ2NmQ5ZTRhZThjYzEzMWI3OWNlIiwidXNlcl9pZCI6MX0.ksghqrYfwC-7B5Znh2l6jZ5Ps2k1wNf9za1NQQRVIRg'
      }
    }).as('loginRequest')
    cy.visit('/login')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.contains('button', 'Sign In').click()
  
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        email: email.toLowerCase(),
        password: password
      })
    })
  })
