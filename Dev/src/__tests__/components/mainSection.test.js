import renderMain from '../../js/components/mainPage';

test('Создание main на странице', () => {
  const main = '<main class="main"><div class="container"></div></main>';

  expect(renderMain().outerHTML).toBe(main);
});
