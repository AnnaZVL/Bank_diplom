/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  el, setChildren,
} from 'redom';
import '../../css/style.scss';
import renderSelect from './select';

export function renderTitleBox(range, name, text) {
  const $title = el(`${range}.${name}`);
  $title.textContent = text;

  return $title;
}

export function renderTitlePage(text, select = '', button = '') {
  const $titlePage = el('div.title-box');
  const $selectBox = el('.div.select-box');
  const optionsArr = ['По номеру', 'По балансу', 'По последней транзакции'];

  setChildren($selectBox, [
    renderTitleBox('h1', 'title', text),
    select ? renderSelect('select filter__select', optionsArr) : '',
  ]);

  setChildren($titlePage, [
    $selectBox,
    button,
  ]);

  return $titlePage;
}
