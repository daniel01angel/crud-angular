// src/app/components/order-list/order-list.component.ts

import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone: false
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  errorMessage: string = '';

  constructor(private orderService: OrderService, public router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  // Obtener todas las órdenes
  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(
        (data: Order[]) => {
          this.orders = data;
        },
        (error) => {
          console.error('Error al obtener las órdenes:', error);
          this.errorMessage = error;
        }
      );
  }

  // Eliminar una orden
  deleteOrder(orderId?: number): void {
    if (orderId === undefined) return;

    if (confirm(`¿Estás seguro de que deseas eliminar la orden con ID ${orderId}?`)) {
      this.orderService.deleteOrder(orderId)
        .subscribe(
          () => {
            // Actualizar la lista de órdenes
            this.orders = this.orders.filter(order => order.orderId !== orderId);
            alert('Orden eliminada exitosamente.');
          },
          (error) => {
            console.error('Error al eliminar la orden:', error);
            this.errorMessage = error;
          }
        );
    }
  }

  // Navegar al formulario de edición
  editOrder(orderId?: number): void {
    if (orderId === undefined) return;
    this.router.navigate(['/edit-order', orderId]);
  }

}
