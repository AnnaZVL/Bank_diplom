/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setChildren } from 'redom';
import '../../css/style.scss';
import renderList from './list';
import renderLink from './link';

// Создание меню навигации
function renderNav() {
  const $nav = el('nav.header__nav');
  const arr = [
    renderLink('header__link', 'map', 'Банкоматы'),
    renderLink('header__link', 'list', 'Счета'),
    renderLink('header__link', 'currency', 'Валюта'),
    renderLink('header__link', '/', 'Выйти'),
  ];

  setChildren($nav, renderList($nav, 'header', arr));

  return $nav;
}

// Создание Шапки сайта
export default function renderHeader(menu) {
  const $header = el('header.header');
  const $headerContainer = el('div.container.header__container');
  const $logo = el('span.header__logo');

  $logo.textContent = 'Coin.';

  setChildren($headerContainer, [
    $logo,
    menu ? renderNav() : '',
  ]);

  setChildren($header, $headerContainer);

  return $header;
}
