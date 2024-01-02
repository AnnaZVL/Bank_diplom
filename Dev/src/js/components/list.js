/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  el, setChildren, list, mount,
} from 'redom';
import '../../css/style.scss';

export default function renderList(parent, name, arr) {
  class Li {
    constructor() {
      this.el = el(`li.${name}__item`);
    }

    update(elem) {
      setChildren(this.el, elem);
    }
  }

  const $list = list(`ul.${name}__list`, Li);

  mount(parent, $list);

  $list.update(arr);

  return $list;
}
