import { Router, ActivatedRoute } from "@angular/router";
import { OrderService } from "./../order.service";
import { Order } from "./../order.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-order-delete",
  templateUrl: "./order-delete.component.html",
  styleUrls: ["./order-delete.component.css"],
})
export class OrdersDeleteComponent implements OnInit {
  order: Order;

  constructor(
    private productService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe((product) => {
      this.order = product;
    });
  }

  deleteOrder(): void {
    this.productService.delete(this.order.id).subscribe(() => {
      this.productService.showMessage("Orden Eliminado!");
      this.router.navigate(["/orders"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/orders"]);
  }
}
