/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  el, setChildren, list,
} from 'redom';
import { renderTitleBox } from './titlePage';
import router from '../../assets/router';

// Преобразование входных данных
export function chengeData(obj, check) {
  const arr = [];
  const newArr = [{ name: 'table__text', text1: 'Счёт отправителя', text2: obj.from },
    { name: 'table__text', text1: 'Счёт получателя', text2: obj.to },
    { name: 'table__text item__amount', text1: 'Сумма', text2: obj.amount.toLocaleString('ru-RU') },
    { name: 'table__text', text1: 'Дата', text2: obj.date }];

  // Добавление +/- к сумме и цветов
  if (Number(newArr[0].text2) === Number(check)) {
    newArr[2].name = 'table__text item__amount outgoing';
    newArr[2].text2 = `- ${newArr[2].text2}`;
  } else {
    newArr[2].name = 'table__text item__amount incoming';
    newArr[2].text2 = `+ ${newArr[2].text2}`;
  }
  arr.push(newArr);

  return arr;
}

// Блок таблицы переводов
export function renderTableTransfer(obj, count, check) {
  const $tableBox = el('div.table-box');
  const arrTitle = [
    [{ type: 'li', name: 'table__header-item', text: 'Счёт отправителя' },
      { type: 'li', name: 'table__header-item', text: 'Счёт получателя' },
      { type: 'li', name: 'table__header-item', text: 'Сумма' },
      { type: 'li', name: 'table__header-item', text: 'Дата' }],
  ];

  // Создание еэлемента шапки таблицы
  class El {
    constructor() {
      this.el = el('');
    }

    update(data) {
      this.el = el(`${data.type}`);
      this.el.textContent = data.text;
      this.el.className = data.name;
    }
  }
  // Создание еэлемента таблицы
  class Li {
    constructor() {
      this.el = el('li.table__item');
    }

    update(data) {
      setChildren(this.el, [
        el('span.table__title', data.text1),
        el(`span.${data.name}`, data.text2),
      ]);
    }
  }

  // Шапка таблицы
  const $tableHeaderBox = el('div.table__header');

  const $tableHeader = list('ul.table__row', El);
  arrTitle.map((item) => $tableHeader.update(item));
  let row = {};
  setChildren($tableHeaderBox, $tableHeader);
  // Перенос значений входного массива в ячейки строки таблицы

  row = obj.transactions.slice(count).map((item) => {
    const $tableRow = list('ul.table__row', Li);
    item.date = new Date(item.date).toLocaleDateString();
    chengeData(item, check).map((i) => $tableRow.update(i));

    return $tableRow;
  });

  setChildren($tableBox, [
    renderTitleBox('h4', 'check__title title__box', 'История переводов'),
    $tableHeaderBox,
    row,
  ]);
  $tableBox.addEventListener('click', () => {
    router.navigate(`/history/:${check}`);
  });
  return $tableBox;
}
