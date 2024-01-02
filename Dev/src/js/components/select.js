import {
  el, list, mount,
} from 'redom';
import '../../css/style.scss';

// Создание Селекта
export default function renderSelect(name, arr) {
  class Option {
    constructor() {
      this.el = el('option');
    }

    update(data) {
      this.el.textContent = data.text;
      this.el.value = data.value;
    }
  }
  // Преобразование списка валют в нужный селекту формат
  const arrSelect = [];
  Object.keys(arr).forEach((item) => {
    arrSelect.push({ text: arr[item], value: arr[item] });
  });

  const $select = list(`select.${name}`, Option);

  mount(document.body, $select);

  $select.update(arrSelect);

  return $select;
}
