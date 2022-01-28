import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';
import { FruitModel } from '../_components/employee-dashboard/fruit-dash-board.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public productsValues: any = [];
  FruitData!: any;


  constructor(private http: HttpClient) { }

  postFruit(data: any) {
    return this.http.post<any>("http://localhost:3000/posts/", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getFruit(data: any) {
    return this.http.get<any>("http://localhost:3000/posts/")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateFruit(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/posts/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteFruit(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateFruitsValue(value: any, id: any) {
    this.getFruit(this.FruitData).subscribe({
      next: (result: any) => {
        this.FruitData = result;
        let i = this.FruitData.findIndex((el: any) => el.id === id);
        this.FruitData[i].quantity = this.FruitData[i].quantity - value;
        this.updateFruit(this.FruitData[i], id)
        .subscribe({
          next: (result: any) => {
            
          }
        })
      }})
  }
}
