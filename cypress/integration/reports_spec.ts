describe('Reports test', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000/');
    cy.get('input[name=username]').type("Dario")
    cy.contains('button','Continue').click()
    cy.url().should('include', '/Reports')
  })
  it('Report success', () => {
    cy.get('#mui-component-select-employeeSelect').select(5)
    cy.contains('button','Save').click()
    
  });

});
