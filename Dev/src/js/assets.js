import { el, setChildren } from 'redom';
import Choices from 'choices.js';

// Путь к странице
export const PATH_URL = 'http://localhost:8080/';

// Инпут с автодополнением для перевода между счетами
export function getCheckList(input, datalist) {
  input.onfocus = () => {
    if (datalist) {
      datalist.classList.add('open');
    }
  };
  document.querySelectorAll('.check__item').forEach((elem) => {
    elem.addEventListener('click', () => {
      input.value = elem.value;
      input.onfocus = false;
      datalist.classList.remove('open');
    });
  });

  let currentFocus = -1;
  input.oninput = () => {
    input.onfocus = true;
    const text = input.value.toUpperCase();
    for (const option of datalist.options) {
      if (option.value.toUpperCase().indexOf(text) > -1) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    }
  };
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('active');
    }
  }
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add('active');
    return currentFocus;
  }
  input.onkeydown = (e) => {
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(datalist.options);
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(datalist.options);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (datalist.options) datalist.options[currentFocus].click();
      }
    }
  };
}

// Сохранение данных в LocalStorage
export function setLocalStorage(name, arr) {
  const localData = localStorage.setItem(name, JSON.stringify(arr));

  return localData;
}

// Получение данных из LocalStorage
export function getLocalStorage(name, arr) {
  let listArray = [];
  const localData = localStorage.getItem(name);

  if (localData !== null && localData !== '') {
    listArray = JSON.parse(localData);
  } else {
    setLocalStorage(name, arr);
    listArray = getLocalStorage(name, arr);
  }

  return listArray;
}

// Создание Фильтрации на странице списка счетов
export function getChoices(elem, name) {
  const choices = new Choices(elem, {
    searchEnabled: false,
    placeholder: true,
    placeholderValue: 'Сортировка',
    itemSelectText: '',
    allowHTML: false,
    classNames: {
      containerOuter: `choices choices-${name}`,
      containerInner: `choices__inner choices__inner-${name}`,
      item: `choices__item choices__item-${name}`,
    },
  });
  return choices;
}

// Создание модального окна успешной операции
export function renderModalSuccess(from, to, amount) {
  const $modal = el('div.modal');
  const $modalBody = el('div.modal__body');
  const $modalTitle = el('h2.modal__title');
  const $modalFrom = el('p.modal__item');
  const $modalTo = el('p.modal__item');
  const $modalAmount = el('p.modal__item');

  $modalTitle.textContent = 'Успех';
  setChildren($modalFrom, el('span.modal__text', `С Вашего счета ${from}`));
  setChildren($modalTo, el('span.modal__text', `на счет ${to}`));
  setChildren($modalAmount, el('span.modal__text modal__amount', `перечислена сумма ${amount.toLocaleString('ru-RU')}`));
  setChildren($modalBody, [
    $modalTitle,
    $modalFrom,
    $modalTo,
    $modalAmount,
  ]);

  setChildren($modal, $modalBody);

  return $modal;
}

// Создание модольного окна Ошибки
export function renderModalError(text) {
  const $modal = el('div.modal');
  const $modalBody = el('div.modal__body');
  const $modalTitle = el('h2.modal__title');
  const $modalError = el('p.modal__item');
  const $modalRezalt = el('p.modal__item');

  $modalTitle.textContent = 'Произошла ошибка';
  $modalError.textContent = text;
  $modalRezalt.textContent = 'Попробуйте еще раз';

  setChildren($modalBody, [
    $modalTitle,
    $modalError,
    $modalRezalt,
  ]);

  setChildren($modal, $modalBody);

  return $modal;
}
