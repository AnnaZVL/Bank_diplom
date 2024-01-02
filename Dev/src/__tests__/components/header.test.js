import renderHeader from '../../js/components/header';

test('Создание шапки сайта', () => {
  const header = '<header class=\"header\"><div class=\"container header__container\"><span class=\"header__logo\">Coin.</span></div></header>';

  const headerMenu = '<header class=\"header\"><div class=\"container header__container\"><span class=\"header__logo\">Coin.</span><nav class=\"header__nav\"><ul class=\"header__list\"><li class=\"header__item\"><a class=\"header__link\" href=\"map\">Банкоматы</a></li><li class=\"header__item\"><a class=\"header__link\" href=\"list\">Счета</a></li><li class=\"header__item\"><a class=\"header__link\" href=\"currency\">Валюта</a></li><li class=\"header__item\"><a class=\"header__link\" href=\"/\">Выйти</a></li></ul></nav></div></header>';
  // Создание шапки без меню
  expect(renderHeader().outerHTML).toBe(header);
  // Создание шапки с меню
  expect(renderHeader(true).outerHTML).toBe(headerMenu);
});
