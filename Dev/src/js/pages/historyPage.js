/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setChildren } from 'redom';
import '../../css/style.scss';
import { renderTableTransfer } from '../components/transferBloсk';
import { renderBalanceBox, renderRatioBox } from '../components/balanceBloсk';
import renderMain from '../components/mainPage';
import { renderTitlePage } from '../components/titlePage';
import renderLink from '../components/link';
import renderInfoCheckBlok from '../components/infoCheckBloсk';
import { getLocalStorage } from '../assets';
import { getAccount } from '../server';

async function renderSectionHistoryPage(check) {
  const $sectionHistory = el('section.section.history');
  const $contentBox = el('div.history__content');

  // Получение токена из ЛокалСт и по нему данных с сервера
  const TOKEN_LOKAL = getLocalStorage('TOKEN', '');
  const currentCheck = check.data.check.slice(1);
  const data = await getAccount(currentCheck, TOKEN_LOKAL);
  const copyObj = data.payload;

  setChildren($contentBox, [
    renderBalanceBox('Динамика баланса', 12, copyObj, currentCheck),
    renderRatioBox('Соотношение входящих исходящих транзакций', 12, copyObj, currentCheck),
    renderTableTransfer(copyObj, -25, currentCheck),
  ]);

  setChildren($sectionHistory, [
    renderTitlePage('История баланса', false, renderLink('check__link icon__back', `/list/:${currentCheck}`, 'Вернуться назад')),
    renderInfoCheckBlok(currentCheck, copyObj.balance),
    $contentBox,
  ]);
  return $sectionHistory;
}
// Создание страницы
export default async function getHistoryPage(check) {
  const $main = renderMain(await renderSectionHistoryPage(check));

  return $main;
}
