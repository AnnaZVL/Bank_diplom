/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setChildren } from 'redom';

// Блок с номером счета и балансом
export default function renderInfoCheckBlok(check, balance) {
  const $checkInfo = el('div.check__info');
  const $checkNumber = el('div.check__number');

  $checkNumber.textContent = `№ ${check}`;

  const $balanceBox = el('div.check__balance');
  const $balanceTitle = el('span.check__balance-title');
  $balanceTitle.textContent = 'Баланс';

  const $balanceSum = el('span.check__balance-sum');
  $balanceSum.textContent = balance.toLocaleString('ru-RU');

  setChildren($balanceBox, [
    $balanceTitle,
    $balanceSum,
  ]);
  setChildren($checkInfo, [
    $checkNumber,
    $balanceBox,
  ]);

  return $checkInfo;
}
