import { ProductItem } from "./product-item";
import { Cart } from "./cart";



export class Order {

  datePlaced: number;
  items: ProductItem[];
  totalAmount;

  constructor(public userId: string, shoppingCart: Cart) {
    this.datePlaced = new Date().getTime();
    this.totalAmount = shoppingCart.totalPrice;
    this.items = shoppingCart.products;
  }
}


