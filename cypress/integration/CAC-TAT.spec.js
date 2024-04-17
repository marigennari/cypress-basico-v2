// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
   
    
    beforeEach(function() { 
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function()  {  
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Mariana')
        cy.get('#lastName').type('Gennari')
        cy.get('#email').type('marigennarif@gmail.com')
        cy.get('#open-text-area').type('meu deus eu quero aprender cypress para que eu consiga um emprego bom', {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Mariana')
        cy.get('#lastName').type('Gennari')
        cy.get('#email').type('marigennarifgmail.com')
        cy.get('#open-text-area').type('meu deus eu quero aprender cypress para que eu consiga um emprego bom', {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('apenas valores numéricos são aceitos', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')    

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Mariana')
        cy.get('#lastName').type('Gennari')
        cy.get('#email').type('marigennarif@gmail.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('meu deus eu quero aprender cypress para que eu consiga um emprego bom', {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Mariana').should('have.value', 'Mariana').clear().should('have.value', '')
        cy.get('#lastName').type('Gennari').should('have.value', 'Gennari').clear().should('have.value', '')
        cy.get('#email').type('marigennarif@gmail.com').should('have.value', 'marigennarif@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('1234567890').should('have.value', '1234567890').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"]').check('feedback')
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
             cy.wrap($radio).check()
             cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('[type="checkbox"]').check().should('be.checked')
            .should('have.length', 2)
                .last().uncheck().should('not.be.checked')

    })
    

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/Yaga.jpg')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('Yaga.jpg')
        })
           
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Yaga.jpg', {action: 'drag-drop'})
        .should('not.have.value')
        .selectFile('cypress/fixtures/Yaga.jpg')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('Yaga.jpg')
        })
    })
        
    })

     it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('Yaga.jpg').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                 expect($input[0].files[0].name).to.equal('Yaga.jpg')
            })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target')
        .click()
    })

    
})
//

