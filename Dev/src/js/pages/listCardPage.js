/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setChildren } from 'redom';
import '../../css/style.scss';
import renderBtn from '../components/button';
import renderCard from '../components/card';
import { renderTitlePage } from '../components/titlePage';
import renderMain from '../components/mainPage';
import renderList from '../components/list';
import { getLocalStorage } from '../assets';
import { getAccounts, createdAccount } from '../server';

//  Функция для отрисовки списка счетов
function createdListCard(arr, parent) {
  const arrCard = [];
  for (const item in arr) {
    if (arr[item] !== undefined) {
      arrCard.push(renderCard(arr[item]));
    }
  }
  const list = renderList(parent, 'cards', arrCard);

  return list;
}

async function renderSectionCardPage(filter) {
  const $sectionCardPage = el('section.section.list-card');
  const $cardsBox = el('div.list-card__cadrs');
  const $addCardBtn = renderBtn('page__btn add-card  icon__plus', 'Создать новый счёт');

  const TOKEN_LOKAL = getLocalStorage('TOKEN', '');

  let dataCopy = await getAccounts(TOKEN_LOKAL);
  let copyObj = dataCopy.payload;
  // Фильтрация по выбранному полю
  switch (filter) {
    case 'По балансу':
      copyObj.sort((a, b) => ((Number(b.balance) - Number(a.balance))));

      break;
    case 'По последней транзакции':
      copyObj.sort((a, b) => {
        if (a.transactions.length) {
          return ((new Date(a.transactions[0].date)
            .getTime() - new Date(b.transactions[0].date).getTime()));
        }
      });

      break;
    default:
      copyObj.sort((a, b) => (Number(a.account) - Number(b.account)));
      break;
  }

  // Отрисовка списка счетов
  let $listCheck = createdListCard(copyObj, $cardsBox);

  // Создание нового счета
  $addCardBtn.addEventListener('click', async () => {
    $cardsBox.innerHTML = '';
    await createdAccount(TOKEN_LOKAL);

    dataCopy = await getAccounts(TOKEN_LOKAL);
    copyObj = dataCopy.payload;
    copyObj.sort((a, b) => (Number(a.account) - Number(b.account)));
    $listCheck = createdListCard(copyObj, $cardsBox);
  });

  setChildren($cardsBox, $listCheck);
  setChildren($sectionCardPage, [
    renderTitlePage('Ваши счета', true, $addCardBtn),
    $cardsBox,
  ]);

  return $sectionCardPage;
}

// Создание страницы списка карт
export default async function getCardListPage(filter) {
  const $main = renderMain(await renderSectionCardPage(filter));

  return $main;
}
