/// <reference types="cypress" />

describe('Авторизация', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });
  it('Успешная авторизация', () => {
    cy.get('.login__input').type('developer');
    cy.get('.password__input').type('skillbox');

    cy.get('.login__form').submit();
  });

  it('Авторизация с ошибкой по паролю', () => {
    cy.get('.login__input').type('developer');
    cy.get('.password__input').type('novalidpassword');
    cy.get('.login__form').submit();

    cy.get('.form__error').should('have.text', 'Логин или пароль не правильный');
  });
});
