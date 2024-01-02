/// <reference types="cypress" />

describe('Навигация в шапке', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    cy.get('.login__input').type('developer');
    cy.get('.password__input').type('skillbox');

    cy.get('.login__form').submit();
  });

  it('Переход на страницу валют', () => {
    cy.contains('Валюта').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/currency');
    });
  });

  it('Переход на страницу банкоматов', () => {
    cy.contains('Банкоматы').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/map');
    });
  });

  it('Выход', () => {
    cy.contains('Выйти').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });
  });

  it('Переход на страницу подробностей счета', () => {
    cy.contains('Открыть').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/list/:27584672175364332254500734');
    });
  });
});
