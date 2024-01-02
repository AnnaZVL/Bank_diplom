// eslint-disable-next-line import/no-extraneous-dependencies

import '../css/normalize.css';
import JustValidate from 'just-validate';
import { el, setChildren } from 'redom';
import renderHeader from './components/header';
import {
  PATH_URL, getCheckList, renderModalSuccess, getChoices, setLocalStorage, getLocalStorage,
} from './assets';
import {
  autorization, getTransfer, getCurrencyBuy,
} from './server';
import router from '../assets/router';
import getSkeletonList from './components/Skeletons/skeletonList';
import getSkeletonCheck from './components/Skeletons/skeletonCheck';
import getSkeletonHistory from './components/Skeletons/skeletonHistory';
import getSkeletonCurrency from './components/Skeletons/skeletonCurrency';
import getSkeletonMap from './components/Skeletons/skeletonMap';

let TOKEN = '';

// Проверка активной страницы в шапке
function setActivePage(currentLink) {
  document.querySelectorAll('.header__link').forEach((link) => {
    link.classList.remove('active__page');
    if (link.href === `${PATH_URL + currentLink}`) {
      link.classList.add('active__page');
    }
  });
}

// Настройка перехода по страницам

// Страница авторизации
router.on('/', async () => {
  const loginMain = await import('./pages/LoginPage');
  const loginPage = loginMain.default;

  setChildren(document.body, [renderHeader(), loginPage()]);
  // Валидация формы входа
  const $form = document.querySelector('.login__form');
  const $login = document.querySelector('.login__input');
  const $password = document.querySelector('.password__input');

  const validate = new JustValidate($form);
  validate
    .addField($login, [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Не менее 6 симфолов',
      },
      {
        rule: 'customRegexp',
        value: /^\S*$/,
        errorMessage: 'Пробелы не допустимы',
      },
    ])
    .addField($password, [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Не менее 6 симфолов',
      },
      {
        rule: 'customRegexp',
        value: /^\S*$/,
        errorMessage: 'Пробелы не допустимы',
      },
    ]);
  // Переход при успешной валидации
  $form.addEventListener('submit', async (event) => {
    event.preventDefault();

    await autorization($login.value, $password.value)
      .then((data) => {
        TOKEN = data.payload.token;
        setLocalStorage('TOKEN', TOKEN);
        router.navigate('/list');
      }).catch((err) => {
        console.log('Error validation', err);
        document.querySelector('.form__error').textContent = 'Логин или пароль не правильный';
        $login.value = '';
        $password.value = '';
      });
  });
});

// Страница списка счетов
router.on('list', async () => {
  try {
    setChildren(document.body, [renderHeader(true), getSkeletonList()]);
    const listMain = await import('./pages/listCardPage');
    const listPage = listMain.default;
    setChildren(document.body, [renderHeader(true), await listPage()]);
    const $filter = document.querySelector('.filter__select');
    getChoices($filter, 'filter');

    // вызов сортировки
    $filter.addEventListener('change', async (e) => {
    // Перерисовка с отсортированными данными
      document.body.innerHTML = '';
      setChildren(document.body, [renderHeader(true), await listPage(e.target.value)]);
      getChoices(document.querySelector('.filter__select', 'filter'));
    });
  } catch (err) {
    console.log('err', err);
  }
  setActivePage('list');
});

// Страница подробностей счета
router.on('list/:check', async (check) => {
  try {
    setChildren(document.body, [renderHeader(true), getSkeletonCheck()]);
    const checkMain = await import('./pages/checkingPage');
    const checkPage = checkMain.default;
    setActivePage('list/');

    setChildren(document.body, [renderHeader(true), await checkPage(check)]);
    // Валидация формы и перевод между счетами
    const $checkForm = document.querySelector('.check__form');
    const $sum = document.querySelector('.check__input');

    // Инпут с автодополнением
    const $inputTo = document.querySelector('.check__to');
    const $datalist = document.querySelector('.check__list');
    getCheckList($inputTo, $datalist);
    const validate = new JustValidate($checkForm);
    validate
      .addField($inputTo, [
        {
          rule: 'required',
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .addField($sum, [
        {
          rule: 'required',
          errorMessage: 'Поле обязательно для заполнения',
        },
        {
          validator: (value) => Number(value) > 0,
          errorMessage: 'Сумма должна быто больше нуля',
        },
      ]);

    // Проверка формы перевода и вызов модалки при успехе
    $checkForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      validate.showErrors({ $sum: 'Превышение доступной суммы' });
      if (validate.isValid) {
        const currentCheck = check.data.check.slice(1);
        const $modal = renderModalSuccess(currentCheck, $inputTo.value, $sum.value);
        const TOKEN_LOKAL = getLocalStorage('TOKEN', '');
        await getTransfer(TOKEN_LOKAL, currentCheck, $inputTo.value, $sum.value);
        setChildren(document.body, [renderHeader(true), await checkPage(check), $modal]);
        document.querySelector('.main').classList.add('hidden');
        $modal.classList.add('open');
        setTimeout(() => {
          $modal.classList.remove('open');
          document.querySelector('.main').classList.remove('hidden');
        }, 3000);

        $inputTo.value = '';
        $sum.value = '';
      }
    });
  } catch (err) {
    console.log('err', err);
  }
});
// Страница истории операций
router.on('history/:check', async (check) => {
  try {
    setChildren(document.body, [renderHeader(true), getSkeletonHistory()]);
    const historyMain = await import('./pages/historyPage');
    const historyPage = historyMain.default;

    setChildren(document.body, [renderHeader(true), await historyPage(check)]);
  } catch (err) {
    console.log('err', err);
  }
});

// Страница валюты
router.on('currency', async () => {
  try {
    setChildren(document.body, [renderHeader(true), getSkeletonCurrency()]);
    const currencyMain = await import('./pages/currencyPage');
    const currencyPage = currencyMain.default;

    setChildren(document.body, [renderHeader(true), await currencyPage()]);
    setActivePage('currency');

    const $exFrom = document.querySelector('.exchange__from');
    getChoices($exFrom, 'exchange');

    const $exTo = document.querySelector('.exchange__to');
    getChoices($exTo, 'exchange');

    const $formExchange = document.querySelector('.exchange__form');
    const $amount = document.querySelector('.exchange__input');

    const $error = document.querySelector('.exchange__error');

    $formExchange.addEventListener('submit', async (even) => {
      even.preventDefault();
      $error.textContent = '';
      const TOKEN_LOKAL = getLocalStorage('TOKEN', '');
      await getCurrencyBuy(TOKEN_LOKAL, $exFrom.value, $exTo.value, $amount.value)
        .then((data) => {
          console.log('data', data);
        }).catch((err) => {
          //  Обработка ошибки перевода, после ответа от сервера
          switch (err) {
            case 'Overdraft prevented': $error.textContent = 'Превышение доступной суммы';
              break;
            case 'Not enough currency': $error.textContent = 'На валютном счёте списания нет средств';
              break;
            case 'Invalid amount': $error.textContent = 'Не указана сумма перевода, или она отрицательная';
              break;
            case 'Unknown currency code': $error.textContent = 'Передан неверный валютный код';
              break;
            default: $error.textContent = 'Проверьте введенные данные';
          }
        });
      $amount.value = '';
    });
  } catch (err) {
    console.log('err', err);
  }
});

// Страница карты банкоматов
router.on('map', async () => {
  try {
    setChildren(document.body, [renderHeader(true), getSkeletonMap()]);
    const mapMain = await import('./pages/mapPage');
    const mapPage = mapMain.default;

    setChildren(document.body, [renderHeader(true), await mapPage()]);
    setActivePage('map');
  } catch (err) {
    console.log('err', err);
  }
});

// Страница не найдена
router.notFound(async () => {
  const mainModule = await import('./components/mainPage');
  const mainPage = mainModule.default;
  const $text = el('h3.title', 'Страница не найдена');

  setChildren(document.body, [renderHeader(true), mainPage($text)]);
  setActivePage();
});

router.resolve();
