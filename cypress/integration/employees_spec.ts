describe('Employees test', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000/');
    cy.get('input[name=username]').type("Dario")
    cy.contains('button','Continue').click()
    cy.url().should('include', '/Reports')
    cy.contains('a', 'Employees').click()
    cy.url().should('include', '/Employees')
  })
  it('Add new Employee success', () => {
    cy.contains('button','Add').click()
  });
  it('Add new Employee success', () => {
    cy.get('input[name=employeeName]').type("NewEmployName")
    cy.contains('button','Add').click()
  });

});
