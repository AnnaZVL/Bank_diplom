/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setChildren } from 'redom';
import '../../css/style.scss';
import ymaps from 'ymaps';
import { renderTitlePage } from '../components/titlePage';
import renderMain from '../components/mainPage';
import { getBanks } from '../server';

async function renderSectionMapPage() {
  const $sectionMap = el('section.section.map');
  const $contentBox = el('div#map');
  const banks = await getBanks();

  ymaps.ready(() => {
    const map = new ymaps.Map('map', {
      center: [44.88, 39.21],
      zoom: 10,
    });

    if (map) {
      ymaps.modules.require(['Placemark'], (Placemark) => {
        banks.payload.forEach((obj) => {
          const myPlacemark = new Placemark([obj.lat, obj.lon]);
          map.geoObjects.add(myPlacemark);
          map.behaviors.disable('scrollZoom'); // Отключение скрола колесиком
          map.geoObjects.add(myPlacemark);
        });
      });
    }
  });

  setChildren($sectionMap, [
    renderTitlePage('Карта банкоматов', false),
    $contentBox,
  ]);
  return $sectionMap;
}

// Создание страницы
export default async function getMapPage() {
  const $main = renderMain(await renderSectionMapPage());

  return $main;
}
