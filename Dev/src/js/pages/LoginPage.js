/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setAttr, setChildren } from 'redom';
import '../../css/style.scss';
import renderBtn from '../components/button';
import renderMain from '../components/mainPage';

// Форма входа
export function renderForm() {
  const $form = el('form.login__form.form');
  const $inputLogin = el('input.form__input.login__input', {
    type: 'text',
    autofocus: true,
    autocomplete: true,
    placeholder: 'Placeholder',
  });

  const $inputPassword = el('input.form__input.password__input', {
    type: 'password',
    autocomplete: true,
    placeholder: 'Placeholder',
  });
  const $error = el('p.form__error');

  const $titleLogin = el('span.login__text.form__text');
  $titleLogin.textContent = 'Логин';

  const $labelLogin = el('label.login__label.form__label');

  setChildren($labelLogin, [$titleLogin, $inputLogin]);

  const $labelPassword = el('label.login__label.form__label');
  const $titlePassword = el('span.login__text.form__text');
  $titlePassword.textContent = 'Пароль';

  setChildren($labelPassword, [$titlePassword, $inputPassword, $error]);

  const $btnForm = renderBtn('login__btn.form__btn', 'Войти');
  setAttr($btnForm, { type: 'submit' });

  setChildren($form, [
    $labelLogin,
    $labelPassword,
    $btnForm,
  ]);

  return $form;
}

// Блок с формой входа
function renderSectionLogin() {
  const $loginSection = el('section.login');
  const $login = el('div.login__box');
  const $titleForm = el('h1.login__title.title');

  $titleForm.textContent = 'Вход в аккаунт';

  setChildren($login, [
    $titleForm,
    renderForm(),
  ]);

  setChildren($loginSection, $login);

  return $loginSection;
}

// Создание страницы входа
export default function getPageLogin() {
  const $main = renderMain(renderSectionLogin());

  return $main;
}
