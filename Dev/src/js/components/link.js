/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';
import '../../css/style.scss';
import router from '../../assets/router';

// Создание ссылки
export default function renderLink(name, href, text) {
  const $link = el(`a.${name}`);

  $link.textContent = text;
  $link.href = href;
  // $link.dataset.check = check;

  $link.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate(href);
  });

  return $link;
}
