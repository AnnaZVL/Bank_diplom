/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setChildren } from 'redom';
import '../../css/style.scss';

export default function renderMain(children) {
  const $container = el('div.container');
  const $main = el('main.main');

  setChildren($container, children);
  setChildren($main, $container);
  return $main;
}
