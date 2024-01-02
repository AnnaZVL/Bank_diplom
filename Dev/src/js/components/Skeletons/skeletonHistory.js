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

  const $diagrammList = el('div.skeleton__wrapper', [
    el('div.skeleton__diagramm.animation'),
    el('div.skeleton__diagramm.animation'),
    el('div.skeleton__diagramm.animation'),
  ]);

  setChildren($section, [
    $titleBox,
    $diagrammList,
  ]);
  return $section;
}
// Создание страницы
export default function getSkeletonHistory() {
  const $main = renderMain(sectionSkeleton());

  return $main;
}
