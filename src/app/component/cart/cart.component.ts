import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { browserRefresh } from 'src/app/app.component';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;
  public browserRefresh!: boolean;

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
    this.browserRefresh = browserRefresh;

    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
      
    if (browserRefresh === true) {
      if (localStorage.getItem('CartItems')) {
        this.cartService.initCartItemList(JSON.parse(localStorage.getItem("CartItems") || ""));
        this.grandTotal = this.cartService.getTotalPrice();            
      }
    }
  }
 
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.cartService.saveTheCart();
  }

  removeOneItem(item: any) {
    this.cartService.removeOneItem(item);
    this.cartService.saveTheCart();
  }

  addCartItem(item: any) {
    this.cartService.addtoCartItem(item);
    this.cartService.saveTheCart();
  }
  
  emptycart() {
    this.cartService.removeAllCart();
    localStorage.removeItem('CartItems');
  }
}