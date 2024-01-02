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

  const $checksBox = el('div.skeleton__box', [
    el('div.skeleton__change.animation'),
    el('div.skeleton__balance.animation'),
    el('div.skeleton__table.animation'),
  ]);
  // el('div.skeleton__top',
  setChildren($section, [
    $titleBox,
    $checksBox,
  ]);
  return $section;
}
// Создание страницы
export default function getSkeletonCheck() {
  const $main = renderMain(sectionSkeleton());

  return $main;
}
