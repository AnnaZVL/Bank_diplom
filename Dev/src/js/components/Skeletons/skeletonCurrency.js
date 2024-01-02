/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setChildren } from 'redom';
import '../../../css/style.scss';
import renderMain from '../mainPage';

function sectionSkeleton() {
  const $section = el('section.section.skeleton');
  const $titleBox = el('div.skeleton__title-box', [
    el('div.skeleton__title.animation'),
    el('div.skeleton__check.animation'),
  ]);

  const $currencyList = el('div.skeleton__currency', [
    el('div.skeleton__inner',
      [el('div.skeleton__item.animation'),
        el('div.skeleton__item.animation')]),
    el('div.skeleton__all.animation'),
  ]);

  setChildren($section, [
    $titleBox,
    $currencyList,
  ]);
  return $section;
}
// Создание страницы
export default function getSkeletonCurrency() {
  const $main = renderMain(sectionSkeleton());

  return $main;
}
