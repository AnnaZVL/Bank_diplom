/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';
import '../../css/style.scss';

// Создание кнопки
export default function renderBtn(name, text) {
  const $btn = el(`button.${name}`);

  $btn.textContent = text;

  return $btn;
}
