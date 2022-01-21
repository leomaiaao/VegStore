import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

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
  saveTheCart(){
    localStorage.setItem('CartItems', JSON.stringify(this.cartItemList));
    }
  initCartItemList(list: any[]){
    this.cartItemList = list;
    this.productList.next(this.cartItemList);
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
  removeOneItem(product: any){
    let i = this.cartItemList.findIndex((el: any) => el.id === product.id);
    if (i !== -1) {
      this.cartItemList[i].numbers -= 1;
      this.cartItemList[i].total = this.cartItemList[i].numbers * this.cartItemList[i].prize;
      if(this.cartItemList[i].numbers === 0){
        this.removeCartItem(product);
      }
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();

  }
  addtoCartItem(product: any) {
    let i = this.cartItemList.findIndex((el: any) => el.id === product.id);
    if (i !== -1) {
      this.cartItemList[i].numbers += 1;
      this.cartItemList[i].total = this.cartItemList[i].numbers * this.cartItemList[i].prize;
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();

  }
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}