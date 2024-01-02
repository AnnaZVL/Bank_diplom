import { renderForm } from '../../js/pages/LoginPage';

test('Создание формы входа', () => {
  const form = '<form class="login__form form"><label class="login__label form__label"><span class="login__text form__text">Логин</span><input class="form__input login__input" type="text" autofocus="" autocomplete="true" placeholder="Placeholder"></label><label class="login__label form__label"><span class="login__text form__text">Пароль</span><input class="form__input password__input" type="password" autocomplete="true" placeholder="Placeholder"><p class="form__error"></p></label><button class="login__btn form__btn" type="submit">Войти</button></form>';

  expect(renderForm().outerHTML).toBe(form);
});
