import { DetailOrder, Order } from './../order.model';
import { OrderService } from './../order.service';
import { DetailService } from './../detailorder.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../product/product.service';
interface Estados {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrdersCreateComponent implements OnInit {
  cantidadProducto:number;
  idProducto:number;
  precioUnitario:number;
  nombreProducto:string;
  selected = 'Pending';
  dynamicArray = [];

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

  // {  
  //   numero: '',
  //   nombre: '',
  //   cantidad: '',
  //   precioUnitario: '',
  //   costo: '',

  // }

  order: Order = {
    id: null,
    cantidad_impuesto: '',
    estado_logica: '',
    idcategoria: null,
    nro_pedido: null,
    cliente: '',
    fecha: '',
    total_impuesto: null,
    total: null,
    sub_total: null,
    cantidad_total: null,
    estado: 'Pending',
  }

  detail:DetailOrder = {
    id_producto: 0,
    id_orden: 0,
    cantidad: 0,
    costo: 0
  }

  constructor(private OrderService: OrderService,private DetailService: DetailService,
      private router: Router, private productService: ProductService) { }

  ngOnInit(): void {

  this.subtotal = 0.00
  this.totalCityTax = 0.00
  this.totalCountryTax = 0.00
  this.totalStateTax = 0.00 
  this.totalFederalTax = 0.00
  this.totalTaxes = 0.00
  this.total = 0.00
    
  }

  createOrder(): void {

    this.order.sub_total =  this.subtotal
    this.order.total =  this.total
    this.order.total_impuesto=  this.totalTaxes

    

    this.OrderService.create(this.order).subscribe((order) => {

      for (let index = 0; index < this.dynamicArray.length; index++) {
        
        this.detail.id_orden = order.id;  
        this.detail.id_producto = this.dynamicArray[index]['idProducto'];  
        this.detail.cantidad = this.dynamicArray[index]['cantidad'];  
        this.detail.costo = this.dynamicArray[index]['costo'];  
 
         this.DetailService.create(this.detail).subscribe(() => {
      
         })


       }


      this.OrderService.showMessage('Orden creado!')
      this.router.navigate(['/orders'])
    })

  }

  cancel(): void {
    this.router.navigate(['/orders'])
  }

  buscarProducto(): void {
    this.productService.readById(this.idProducto).subscribe(products => {
      
      this.precioUnitario = parseFloat(products.precio_unitario)
      this.nombreProducto = products.nombre;
    })
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
