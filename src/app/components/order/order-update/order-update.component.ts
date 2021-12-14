import { DetailOrder, Order } from "./../order.model";
import { Router, ActivatedRoute } from "@angular/router";
import { OrderService } from "./../order.service";
import { Component, OnInit } from "@angular/core";
import { DetailService } from './../detailorder.service';
import { ProductService } from "../../product/product.service";

interface Estados {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-order-update",
  templateUrl: "./order-update.component.html",
  styleUrls: ["./order-update.component.css"],
})
export class OrdersUpdateComponent implements OnInit {
  order: Order;
  detail:DetailOrder = {
    id_producto: 0,
    id_orden: 0,
    cantidad: 0,
    costo: 0
  }
  cantidadProducto:number;
  idProducto:number;
  precioUnitario:number;
  nombreProducto:string;
  selected = 'Pending';
  dynamicArray = [];
  dynamicArrayResponse = [];
arrayId= []
  estados: Estados[] = [
    {value: 'Pending', viewValue: 'Pending'},
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'Rejected', viewValue: 'Rejected'},
  ]; 
  numeroT:string
  nombreT:string
  cantidadT:string
  precioUnitarioT:string
  costoT:string

  subtotal:number;
  totalCityTax:number;
  totalCountryTax:number;
  totalStateTax:number;
  totalFederalTax:number;
  totalTaxes:number;
  total:number;
  constructor(
    private OrderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private DetailService: DetailService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.OrderService.readById(id).subscribe((product) => {
      this.order = product;
      this.DetailService.readByProductsId(this.order.id).subscribe((detail) => {
       for (let index = 0; index < detail.length; index++) {
        this.dynamicArrayResponse.push(detail);
         
       }
       
       console.log("vreee",this.dynamicArrayResponse)
 for (let index = 0; index <  this.dynamicArrayResponse.length; index++) {
   console.log("eeeeee",this.dynamicArrayResponse[index][0]['0'])
  this.nombreProducto= this.dynamicArrayResponse[index][0]['5'];
  this.cantidadProducto= this.dynamicArrayResponse[index][0]['3'];
  this.precioUnitario= this.dynamicArrayResponse[index][0]['6'];
  this.idProducto= this.dynamicArrayResponse[index][0]['1'];
  this.arrayId.push(this.dynamicArrayResponse[index][0]['0'])
  this.addRow();
 }
 this.nombreProducto= '';
 this.cantidadProducto= null;
 this.precioUnitario= null;
 this.idProducto=null
 
       // this.dynamicArray = detail;
        
      });
    });
  }

  updateOrder(): void {

    this.order.sub_total =  this.subtotal
    this.order.total =  this.total
    this.order.total_impuesto=  this.totalTaxes

    this.OrderService.update(this.order).subscribe(() => {
     
      console.log("array",this.dynamicArray)
      for (let index = 0; index < this.dynamicArray.length; index++) {
        
        this.detail.id_orden = this.order.id;  
        this.detail.id_producto = this.dynamicArray[index]['idProducto'];  
        this.detail.cantidad = this.dynamicArray[index]['cantidad'];  
        this.detail.costo = this.dynamicArray[index]['costo'];  
 
         this.DetailService.create(this.detail).subscribe(() => {
      
         })
        }

        for (let index = 0; index <  this.arrayId.length; index++) {
          var id = this.arrayId[index];
          this.DetailService.delete(id).subscribe(() => {
      
          })
        }
      this.OrderService.showMessage("Orden Actualizaco Correctamente!");
      this.router.navigate(["/orders"]);
    });
  }
 
  buscarProducto(): void {
    this.productService.readById(this.idProducto).subscribe(products => {
      
      this.precioUnitario = parseFloat(products.precio_unitario)
      this.nombreProducto = products.nombre;
    })
  }
  cancel(): void {
    this.router.navigate(["/orders"]);
  }
  addRow() {
    this.dynamicArray.push({ numero: this.dynamicArray.length+1, nombre: this.nombreProducto, cantidad: this.cantidadProducto, precioUnitario: this.precioUnitario, costo: this.precioUnitario*this.cantidadProducto, idProducto: this.idProducto});
    console.log('New row added successfully', 'New Row');
    this.subtotal = 0
    for (let index = 0; index < this.dynamicArray.length; index++) {
     console.log(this.dynamicArray[index]['costo'])
      this.subtotal += this.dynamicArray[index]['costo'];     
    }

    this.totalCityTax = this.percentage(10,this.subtotal)
    this.totalCountryTax = this.percentage(5,this.subtotal+this.totalCityTax)
    this.totalStateTax = this.percentage(8,this.subtotal+this.totalCityTax+this.totalCountryTax)
    this.totalFederalTax = this.percentage(2,this.subtotal+this.totalCityTax+this.totalCountryTax+this.totalStateTax)
    this.totalTaxes = this.totalCityTax+this.totalCountryTax+this.totalStateTax+this.totalFederalTax
    this.total =  this.subtotal + this.totalTaxes

  }
  deleteRow(index) {
    this.dynamicArray.splice(index, 1);
  }
  getValues() {
    console.log(this.dynamicArray);
  }

   percentage(partialValue, totalValue) {
    return ((partialValue/ 100) * totalValue);
 } 


}
