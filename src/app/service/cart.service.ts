import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() { }
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {

    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any) {
    let i = this.cartItemList.findIndex((el: any) => el.id === product.id);
    if (i !== -1) {
      this.cartItemList[i].numbers += 1;
      this.cartItemList[i].total = this.cartItemList[i].numbers * this.cartItemList[i].prize;
    } else { 
      this.cartItemList.push(product); 
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}