/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  el, setChildren, list, mount, setAttr,
} from 'redom';
import '../../css/style.scss';
import renderMain from '../components/mainPage';
import { renderTitlePage, renderTitleBox } from '../components/titlePage';
import renderBtn from '../components/button';
import renderSelect from '../components/select';
import arrowGreen from '../../images/arrow_green.svg';
import arrowRed from '../../images/arrow_red.svg';
import { getCurrencies, getAllCurrencies } from '../server';
import { getLocalStorage } from '../assets';

// Создание списка
function renderLi(parent, name, arr) {
  class Li {
    constructor() {
      this.el = el(`li.${name}__item`);
    }

    update(data) {
      setChildren(this.el, [
        el(`span.${name}__text.text-dotter`, `${data.code}`),
        el(`span.${name}__text`, `${data.amount}`),
      ]);
    }
  }

  const $list = list(`ul.${name}__list`, Li);

  mount(parent, $list);

  $list.update(arr);

  return $list;
}

async function renderCurrencyBox() {
  const $currenсisBox = el('div.currency__currenсis.currenсis');
  const arr = [];

  const TOKEN_LOKAL = getLocalStorage('TOKEN', '');
  const dataCopy = await getCurrencies(TOKEN_LOKAL);
  const copyObj = dataCopy.payload;

  Object.values(copyObj).forEach((item) => {
    if (item.amount > 0) {
      arr.push({ name: 'currencie', code: item.code, amount: item.amount });
    }
  });

  const $currenсisList = renderLi($currenсisBox, 'currenсis', arr);

  setChildren($currenсisBox, [
    renderTitleBox('h4', 'title__box', 'Ваши валюты'),
    $currenсisList,
  ]);

  return $currenсisBox;
}

async function renderExchangeBox() {
  // Получение списка валют
  const dataCopy = await getAllCurrencies();
  const copyObj = dataCopy.payload;

  const $exchangeBox = el('div.currency__exchange.exchange');
  const $formExchange = el('form.exchange__form');
  const $formLeft = el('div.exchange__left');
  const $labelFrom = el('label.exchange__label.form__label');
  const $fromTitle = el('span.exchange__text.form__text');
  $fromTitle.textContent = 'Из';
  const $selectFrom = renderSelect('exchange__select exchange__from', copyObj);

  setChildren($labelFrom, [$fromTitle, $selectFrom]);

  const $labelTo = el('label.exchange__label.form__label');
  const $toTitle = el('span.exchange__text.form__text');
  $toTitle.textContent = 'в';
  const $selectTo = renderSelect('exchange__select exchange__to', copyObj);
  setChildren($labelTo, [$toTitle, $selectTo]);

  const $labelAmount = el('label.exchange__label.form__label');
  const $titleAmount = el('span.exchange__text.form__text');
  const $errorAmount = el('span.exchange__error');
  $titleAmount.textContent = 'Сумма';
  const $inputAmount = el('input.exchange__input.form__input', {
    type: 'text',
    autofocus: true,
    placeholder: 'Placeholder',
  });

  const $selectBox = el('div.exchange__box');
  setChildren($selectBox, [
    $labelFrom,
    $labelTo,
  ]);
  setChildren($labelAmount, [$titleAmount, $inputAmount]);
  setChildren($formLeft, [$selectBox, $labelAmount, $errorAmount]);

  const $btnForm = renderBtn('exchange__btn.form__btn', 'Обменять');
  setAttr($btnForm, { type: 'submit' });
  $btnForm.addEventListener('click', () => {

  });

  setChildren($formExchange, [
    $formLeft,
    $btnForm,
  ]);
  setChildren($exchangeBox, [
    renderTitleBox('h4', 'title__box', 'Обмен валюты'),
    $formExchange,
  ]);
  $formExchange.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  return $exchangeBox;
}

function renderChangeBox() {
  const $changeBox = el('div.currency__change.change');
  const $changeList = el('div.change__list');

  const socket = new WebSocket('ws://localhost:3000/currency-feed');
  // Открытие соединения
  socket.onopen = function (event) {
    console.log('WebSocket is open now:', event);
  };
  // Получение ответа
  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);

    if (data.type === 'EXCHANGE_RATE_CHANGE') {
      const $li = el('div.change__item', [
        el('span.change__text.text-dotter', `${data.from} / ${data.to}`),
        el('span.change__text', `${data.rate}`),
        el('img.arrow', {
          src: data.change !== -1 ? arrowGreen : arrowRed,
        }),
      ]);

      $changeList.prepend($li);
      // Проверяем количество элементов и удаляем лишние
      const maxItems = 22;
      while ($changeList.children.length > maxItems) {
        $changeList.children[$changeList.children.length - 1].remove();
      }
    }
  };
  // Ошибка вебсокета
  socket.onerror = function (event) {
    console.error('WebSocket error:', event);
  };
  // Закрытие вебсокета
  socket.onclose = function (event) {
    console.log('WebSocket close:', event);
  };
  setChildren($changeBox, [
    renderTitleBox('h4', 'title__box', 'Изменение курсов в реальном времени'),
    $changeList,
  ]);

  return $changeBox;
}

async function renderSectionCurrencyPage() {
  const $sectionCurrency = el('section.section.currency');
  const $contentBox = el('div.currency__content');
  const $currencyLeft = el('div.currency__left');

  setChildren($currencyLeft, [
    await renderCurrencyBox(),
    await renderExchangeBox(),
  ]);

  setChildren($contentBox, [
    $currencyLeft,
    renderChangeBox(),
  ]);

  setChildren($sectionCurrency, [
    renderTitlePage('Валютный обмен', false),
    $contentBox,
  ]);
  return $sectionCurrency;
}

// Создание страницы
export default async function getCurrencyPage() {
  const $main = renderMain(await renderSectionCurrencyPage());

  return $main;
}
