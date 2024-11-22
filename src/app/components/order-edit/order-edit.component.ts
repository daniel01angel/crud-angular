// src/app/components/order-edit/order-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService, Order } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
  standalone: false
})
export class OrderEditComponent implements OnInit {

  orderForm: FormGroup;
  orderId?: number;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    // Inicializar el formulario con validaciones
    this.orderForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.maxLength(5)]],
      employeeId: [null, [Validators.pattern(/^\d+$/)]],
      orderDate: [''],
      requiredDate: [''],
      shippedDate: [''],
      shipVia: [null, [Validators.pattern(/^\d+$/)]],
      freight: [null, [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      shipName: ['', Validators.required],
      shipAddress: [''],
      shipCity: [''],
      shipRegion: [''],
      shipPostalCode: [''],
      shipCountry: ['']
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la orden desde la ruta
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.orderId) {
      this.getOrder(this.orderId);
    } else {
      this.errorMessage = 'ID de orden no válido.';
    }
  }

  // Obtener la orden por ID y rellenar el formulario
  getOrder(id: number): void {
    this.orderService.getOrderById(id)
      .subscribe(
        (data: Order) => {
          // Rellenar el formulario con los datos obtenidos
          this.orderForm.patchValue({
            customerId: data.customerId,
            employeeId: data.employeeId,
            orderDate: data.orderDate,
            requiredDate: data.requiredDate,
            shippedDate: data.shippedDate,
            shipVia: data.shipVia,
            freight: data.freight,
            shipName: data.shipName,
            shipAddress: data.shipAddress,
            shipCity: data.shipCity,
            shipRegion: data.shipRegion,
            shipPostalCode: data.shipPostalCode,
            shipCountry: data.shipCountry
          });
        },
        (error) => {
          console.error('Error al obtener la orden:', error);
          this.errorMessage = 'No se pudo obtener la orden. Por favor, intenta nuevamente.';
        }
      );
  }

  // Actualizar la orden
  updateOrder(): void {
    if (this.orderForm.invalid || this.orderId === undefined) {
      this.errorMessage = 'Por favor, completa los campos obligatorios correctamente.';
      return;
    }

    const updatedOrder: Order = {
      orderId: this.orderId,
      customerId: this.orderForm.value.customerId,
      employeeId: this.orderForm.value.employeeId ? Number(this.orderForm.value.employeeId) : undefined,
      orderDate: this.orderForm.value.orderDate || undefined,
      requiredDate: this.orderForm.value.requiredDate || undefined,
      shippedDate: this.orderForm.value.shippedDate || undefined,
      shipVia: this.orderForm.value.shipVia ? Number(this.orderForm.value.shipVia) : undefined,
      freight: this.orderForm.value.freight ? Number(this.orderForm.value.freight) : undefined,
      shipName: this.orderForm.value.shipName,
      shipAddress: this.orderForm.value.shipAddress || undefined,
      shipCity: this.orderForm.value.shipCity || undefined,
      shipRegion: this.orderForm.value.shipRegion || undefined,
      shipPostalCode: this.orderForm.value.shipPostalCode || undefined,
      shipCountry: this.orderForm.value.shipCountry || undefined
    };

    this.orderService.updateOrder(this.orderId, updatedOrder)
      .subscribe(
        () => {
          alert('Orden actualizada exitosamente.');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al actualizar la orden:', error);
          this.errorMessage = 'No se pudo actualizar la orden. Por favor, intenta nuevamente.';
        }
      );
  }

  // Obtener controles del formulario para acceso fácil en la plantilla
  get f() {
    return this.orderForm.controls;
  }

}
