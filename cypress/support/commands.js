Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Mariana')
    cy.get('#lastName').type('Gennari')
    cy.get('#email').type('marigennarif@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

})