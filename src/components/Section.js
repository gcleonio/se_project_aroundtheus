export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }

  // public method that renders all elements on the page
  // remove old since no longer need to show initial hardcoded cards
  // renderItems() {
  //   this._items.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  // need to make sure this method can handle incoming data and loop through it with forEach
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // public method takes a DOM element and adds it to container
  addItem(element) {
    this._container.prepend(element);
  }
}
