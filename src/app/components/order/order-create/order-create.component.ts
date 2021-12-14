import { Order } from './../order.model';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrdersCreateComponent implements OnInit {
  cantidadProducto:number;
  idProducto:number;
  precioUnitario:number;

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
    estado: '',
  }

  constructor(private OrderService: OrderService,
      private router: Router) { }

  ngOnInit(): void {
    
  }

  createOrder(): void {
    this.OrderService.create(this.order).subscribe(() => {
      this.OrderService.showMessage('Orden creado!')
      this.router.navigate(['/orders'])
    })

  }

  cancel(): void {
    this.router.navigate(['/orders'])
  }

  buscarProducto(): void {

  }

}
