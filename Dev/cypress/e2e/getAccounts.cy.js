/// <reference types="cypress" />

describe('Получение данных по счету', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    cy.get('.login__input').type('developer');
    cy.get('.password__input').type('skillbox');

    cy.get('.login__form').submit();
  });
  it('Получение данных по счету', () => {
    cy.intercept('GET', 'http://localhost:3000/accounts', {
      headers: {
        authorization: '\'Basic ZGV2ZWxvcGVyOnNraWxsYm94',
      },
    }).as('getAccounts');
    it('Получение данных по счету', () => {
      // cy.wait('@getAccounts');

      cy.wait('@getAccounts').should((interception) => {
        // expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.be.an('object');
        expect(interception.response.body).to.include([{}]);
      });
    });
  });
});
