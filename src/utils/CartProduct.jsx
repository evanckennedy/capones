export default class CartProduct {
    #id;
    #title;
    #price;
    #image;
    #quantity;
    #totalPrice;
    #size;
    #color;
    #upc;
  
    constructor (id, title, price, image, quantity) {
      this.#id = id;
      this.#title = title;
      this.#price = price;
      this.#image = image;
      this.#quantity = quantity;
      this.#totalPrice = price * quantity;
      this.#size = this.getSize();
      this.#color = this.getColor();
      this.#upc = this.getUPC();
    }
  
    get id() { return this.#id; }
    get title() { return this.#title; }
    get price() { return this.#price; }
    get image() { return this.#image; }
    get quantity() { return this.#quantity; }
    get size() { return this.#size; }
    get color() { return this.#color; }
    get totalPrice() { return this.#totalPrice; }
    get upc() { return this.#upc; }

    updateQuantity(newQuantity) {
      this.#quantity = newQuantity;
      this.#totalPrice = this.#price * newQuantity;
    }

    getRandomValueFromList(list) {
      const randomIndex = Math.floor(Math.random() * list.length);
      return list[randomIndex];
    }

    getSize() {
      const sizeList = ['XS', 'S', 'M', 'L', 'XL'];
      return this.getRandomValueFromList(sizeList);
    }

    getColor() {
      const colorList = ['WHITE', 'BLACK', 'BLUE', 'PURPLE', 'RED'];
      return this.getRandomValueFromList(colorList);
    }

    getUPC() {
      return Math.floor(Math.random() * 90000000) + 10000000;
    }

  }