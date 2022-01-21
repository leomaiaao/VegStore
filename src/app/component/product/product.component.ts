import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string="";
  constructor(private api : ApiServiceService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        Object.assign(a,{numbers:1,total:Number(a.prize) });
      });
    });
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item: any){
    this.cartService.addtoCart(item);
    this.cartService.saveTheCart();
  }
  filter(type:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.type == type || type==''){
        return a;
      }
    })
  }
}