describe('Reports test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name=username]').type('Dario');
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/Reports');
  });
  it('Report success', () => {
    cy.get('#mui-component-select-employeeSelect').click();
    cy.wait(500);
    cy.contains('li', 'Cristina').click();
    cy.wait(500);
    cy.contains('button', 'Save').click();
    cy.wait(500);
    cy.contains('11/day and 1/night have been reported.');
  });
});
