import { Order } from "./../order.model";
import { Router, ActivatedRoute } from "@angular/router";
import { OrderService } from "./../order.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-order-update",
  templateUrl: "./order-update.component.html",
  styleUrls: ["./order-update.component.css"],
})
export class OrdersUpdateComponent implements OnInit {
  order: Order;

  constructor(
    private OrderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.OrderService.readById(id).subscribe((product) => {
      this.order = product;
    });
  }

  updateOrder(): void {
    this.OrderService.update(this.order).subscribe(() => {
      this.OrderService.showMessage("Orden Actualizaco Correctamente!");
      this.router.navigate(["/orders"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/orders"]);
  }
}
