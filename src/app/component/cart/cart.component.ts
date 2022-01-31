import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { browserRefresh } from 'src/app/app.component';
import { ApiService } from 'src/app/Employee/_services/api.service';
import { jsPDF } from "jspdf";
import { ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;
  public browserRefresh!: boolean;
  @ViewChild('conteudo', {static: false}) el!: ElementRef;

  constructor(private cartService: CartService, private apiService: ApiService) { }


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
   
  sucessButton(){
    alert("Buyed Sucessfull");
    this.cartService.cartItemList.map((item:any)=>{
      this.apiService.updateFruitsValue(item.numbers, item.id); 
    })
    this.printPDF();
    this.cartService.removeAllCart();
  }

  printPDF(){
    console.log(this.el);
    let pdf =  new jsPDF('l', 'pt', 'a3');
    pdf.html(this.el.nativeElement, {
      callback: (pdf)=> {
        pdf.save("notaFiscal.pdf");
      }
    })
  }
}