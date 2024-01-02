/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  el, setChildren, setAttr, mount, list,
} from 'redom';
import '../../css/style.scss';
import renderLink from '../components/link';
import { renderTitlePage, renderTitleBox } from '../components/titlePage';
import renderMain from '../components/mainPage';
import renderBtn from '../components/button';
import { renderTableTransfer } from '../components/transferBloсk';
import { renderBalanceBox } from '../components/balanceBloсk';
import renderInfoCheckBlok from '../components/infoCheckBloсk';
import { getLocalStorage } from '../assets';
import { getAccounts, getAccount } from '../server';

// форма перевода
async function renderForm() {
  const $form = el('form.check__form.form');
  const $labelCheck = el('label.check__label.form__label');
  const $titleCheck = el('span.check__text.form__text');
  $titleCheck.textContent = 'Номер счёта получателя';
  const currencyChecks = [];
  const availableAccounts = ['61253747452820828268825011',
    '05168707632801844723808510',
    '17307867273606026235887604',
    '27120208050464008002528428',
    '2222400070000005',
    '5555341244441115'];
  const TOKEN_LOKAL = getLocalStorage('TOKEN', '');

  const dataCopy = await getAccounts(TOKEN_LOKAL);
  const copyObj = dataCopy.payload;
  copyObj.map((item) => currencyChecks.push(item.account));
  const allChecks = [...currencyChecks, ...availableAccounts];

  const $inputCheckTo = el('input.check__to', {
    type: 'text',
    name: 'check-list',
    placeholder: 'Placeholder',
    autocomplete: 'off',
    list: '',
  });

  // Список счетов в автодополнение
  function renderDatalist(name, arr) {
    class Option {
      constructor() {
        this.el = el('option');
      }

      update(data) {
        this.el.value = data;
        this.el.textContent = data;
        this.el.className = 'check__item';
      }
    }

    const $datalist = list('datalist.#check-list.check__list', Option);

    mount(document.body, $datalist);

    $datalist.update(arr);

    return $datalist;
  }

  setChildren($labelCheck, [
    $titleCheck, $inputCheckTo, renderDatalist('check', allChecks),
  ]);

  const $labelSum = el('label.check__label.form__label');
  const $titleSum = el('span.check__text.form__text');
  $titleSum.textContent = 'Сумма перевода';
  const $inputSum = el('input.check__input.form__input', {
    type: 'text',
    autofocus: true,
    placeholder: 'Placeholder',
  });

  setChildren($labelSum, [
    $titleSum,
    $inputSum,
  ]);

  const $btnForm = renderBtn('check__btn form__btn icon__mail', 'Отправить');
  setAttr($btnForm, { type: 'submit' });
  const $formTop = el('div.check__form-top');
  setChildren($formTop, [$labelCheck,
    $labelSum]);
  setChildren($form, [
    $formTop,
    $btnForm,
  ]);

  $form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  return $form;
}

// Блок перевода
async function renderFormBox() {
  const $formBox = el('div.check__box');

  setChildren($formBox, [
    renderTitleBox('h4', 'check__title title__box', 'Новый перевод'),
    await renderForm(),
  ]);

  return $formBox;
}

// все блоки страницы
async function renderSectionCheckingPage(check) {
  const $sectionCheckingPage = el('section.section.check');
  const $contentBox = el('div.check__content');

  // Получение токена из ЛокалСт и по нему данных с сервера
  const TOKEN_LOKAL = getLocalStorage('TOKEN', '');
  const currentCheck = check.data.check.slice(1);
  const data = await getAccount(currentCheck, TOKEN_LOKAL);
  const copyObj = data.payload;

  setChildren($contentBox, [
    await renderFormBox(),
    renderBalanceBox('Динамика баланса', 6, copyObj, currentCheck),
    renderTableTransfer(copyObj, -10, currentCheck),
  ]);

  setChildren($sectionCheckingPage, [
    renderTitlePage('Просмотр счёта ', false, renderLink('check__link icon__back', '/list', 'Вернуться назад')),
    renderInfoCheckBlok(currentCheck, copyObj.balance),
    $contentBox,
  ]);
  return $sectionCheckingPage;
}

// Создание страницы
export default async function getCheckingPage(check) {
  const $main = renderMain(await renderSectionCheckingPage(check));

  return $main;
}
