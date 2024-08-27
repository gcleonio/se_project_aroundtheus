export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }

  // public method that renders all elements on the page
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // public method takes a DOM element and adds it to container
  addItem(element) {
    this._container.prepend(element);
  }
}
