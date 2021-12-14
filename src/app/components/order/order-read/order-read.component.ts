import { OrderService } from './../order.service';
import { Order } from './../order.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-read',
  templateUrl: './order-read.component.html',
  styleUrls: ['./order-read.component.css']
})
export class OrdersReadComponent implements OnInit {

  order: Order[]
  displayedColumns = ['id',  'nombre',  'idcategoria',  'precio_unitario', 'status', 'action']
  
  constructor(private productService: OrderService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.order = products
    })
  }

}
