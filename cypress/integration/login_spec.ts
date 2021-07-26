describe('Login ok', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000/');
  })
  it('load login with error', () => {
    cy.contains('button','Continue').click()
    cy.contains('Incorrect entry.').should('exist')
  });
  it('load login success', () => {
    cy.get('input[name=username]').type("Dario")
    cy.contains('button','Continue').click()
    cy.url().should('include', '/Reports')
  });
});
