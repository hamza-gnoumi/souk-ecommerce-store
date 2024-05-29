export class ProductItem {
  idProduct: string;
  price: number;
  quantity: number;
  constructor(init?: Partial<ProductItem>) {
    Object.assign(this, init);
  }
  get totalPrice() {
    return this.price * this.quantity;
  }

}
