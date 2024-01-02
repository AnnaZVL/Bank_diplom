import {
  el, setChildren,
} from 'redom';
import renderLink from './link';
import '../../css/style.scss';

export default function renderCard(obj) {
  // console.log('object', obj);
  const $card = el('div.card');
  const $cardTop = el('div.card__top');
  const $numberAccount = el('h4.card__account');
  $numberAccount.textContent = obj.account;

  const $cardSum = el('span.card__sum');
  if (obj.balance > 0) {
    $cardSum.textContent = `${obj.balance.toLocaleString('ru-RU')}`;
  } else {
    $cardSum.textContent = '0';
  }

  const $cardBottom = el('div.card__bottom');
  setChildren($cardTop, [
    $numberAccount,
    $cardSum,
  ]);

  const $dataBox = el('div.card__box-data');
  const $dataTitle = el('span.card__text-data');
  const $data = el('span.card__data');
  $dataTitle.textContent = 'Последняя транзакция:';
  // Обработка даты
  const lastTransaction = obj.transactions;

  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  if (lastTransaction.length !== 0) {
    lastTransaction.forEach((element) => {
      $data.textContent = `${new Date(element.date).getDate()} ${months[new Date(element.date).getMonth()]} ${new Date(element.date).getFullYear()}`;
    });
  } else {
    $data.textContent = 'транзакций не было';
  }

  setChildren($dataBox, [
    $dataTitle,
    $data,
  ]);

  setChildren($cardBottom, [
    $dataBox,
    renderLink('card__link', `/list/:${obj.account}`, 'Открыть'),
  ]);

  setChildren($card, [
    $cardTop,
    $cardBottom,
  ]);

  return $card;
}
