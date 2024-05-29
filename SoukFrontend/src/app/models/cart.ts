import { ProductItem } from './product-item';
export class Cart {
  id?: string;
  products: ProductItem[] = [];
  userId: String;


  getQuantity(product: ProductItem) {

    let item = this.products[product.idProduct];
    return item ? item.quantity : 0;
  }

  get quantityOfPdtInCart() {
    let count = 0;
    for (let pdt in this.products) {
      count += this.products[pdt].quantity;
    }
    return count;
  }
  get totalPrice() {
    let price = 0;
    for (let pdt in this.products) {
      price += this.products[pdt].totalPrice;
    }
    return price;
  }
}


