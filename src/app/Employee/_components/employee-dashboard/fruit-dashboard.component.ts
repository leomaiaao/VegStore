import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FruitModel } from './fruit-dash-board.model';
import { ApiService } from '../../_services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Fruit-dashboard',
  templateUrl: './fruit-dashboard.component.html',
  styleUrls: ['./fruit-dashboard.component.scss']
})
export class FruitDashboardComponent implements OnInit {

  formValue!: FormGroup;
  fruitModelObj: FruitModel = new FruitModel();
  FruitData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      itemName: [''],
      type: [''],
      quantity: [''],
      prize: [''],
      cod: [''],
      image: ['']

    })
    this.getAllFruit();
  }
  clickAddFruit() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postFruitDetails() {
    this.fruitModelObj.itemName = this.formValue.value.itemName;
    this.fruitModelObj.type = this.formValue.value.type;
    this.fruitModelObj.quantity = this.formValue.value.quantity;
    this.fruitModelObj.prize = this.formValue.value.prize;
    this.fruitModelObj.cod = this.formValue.value.cod;
    this.fruitModelObj.image = this.formValue.value.image;
    // this.codValue += Math.random().toString(36).substring(2);


    this.api.postFruit(this.fruitModelObj).subscribe({
      next: (result: any) => {
        console.log(result);
        alert("Item Added Successfuly")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllFruit();
      },
      error: (err: any) => {
        alert("Something Went Wrong");
      }
    })
  }
  getAllFruit() {
    this.api.getFruit(this.FruitData)
      .subscribe({
        next: (result: any) => {
          this.FruitData = result;
        }
      })
  }
  deleteFruit(row: any) {
    this.api.deleteFruit(row.id)
      .subscribe({
        next: (result: any) => {
          alert("Item Deleted");
          this.getAllFruit();
        }
      })
  }
  onEdit(row: any) {
    this.fruitModelObj.id = row.id;
    this.formValue.controls['itemName'].setValue(row.itemName);
    this.formValue.controls['type'].setValue(row.type);
    this.formValue.controls['quantity'].setValue(row.quantity);
    this.formValue.controls['prize'].setValue(row.prize);
    this.formValue.controls['cod'].setValue(row.cod);
    this.formValue.controls['image'].setValue(row.image);

    this.showAdd = false;
    this.showUpdate = true;
  }
  updateFruitDetails() {
    this.fruitModelObj.itemName = this.formValue.value.itemName;
    this.fruitModelObj.type = this.formValue.value.type;
    this.fruitModelObj.quantity = this.formValue.value.quantity;
    this.fruitModelObj.prize = this.formValue.value.prize;
    this.fruitModelObj.cod = this.formValue.value.cod;
    this.fruitModelObj.image = this.formValue.value.image;

    this.api.updateFruit(this.fruitModelObj, this.fruitModelObj.id)
      .subscribe({
        next: (result: any) => {
          alert("Item Updated");
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllFruit();
        }
      })
  }
  clickToGoOut() {
    this.router.navigate(['login']);
    sessionStorage.clear();

  }
}
