// src/app/components/order-create/order-create.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService, Order } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
  standalone: false
})
export class OrderCreateComponent implements OnInit {
  orderForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    public router: Router
  ) {
    // Inicializar el formulario con todos los campos y validaciones
    this.orderForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.maxLength(5)]],
      employeeId: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      orderDate: ['', Validators.required],
      requiredDate: ['', Validators.required],
      shippedDate: [''],
      shipVia: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      freight: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      shipName: ['', Validators.required],
      shipAddress: ['', Validators.required],
      shipCity: ['', Validators.required],
      shipRegion: [''],
      shipPostalCode: ['', Validators.pattern(/^\d+$/)],
      shipCountry: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Lógica adicional al iniciar el componente, si es necesaria
  }

  // Crear una nueva orden
  createOrder(): void {
    if (this.orderForm.invalid) {
      this.errorMessage = 'Por favor, completa los campos obligatorios correctamente.';
      return;
    }

    const newOrder: Order = {
      customerId: this.orderForm.value.customerId,
      employeeId: this.orderForm.value.employeeId,
      orderDate: this.orderForm.value.orderDate,
      requiredDate: this.orderForm.value.requiredDate,
      shippedDate: this.orderForm.value.shippedDate || undefined,
      shipVia: this.orderForm.value.shipVia,
      freight: this.orderForm.value.freight,
      shipName: this.orderForm.value.shipName,
      shipAddress: this.orderForm.value.shipAddress,
      shipCity: this.orderForm.value.shipCity,
      shipRegion: this.orderForm.value.shipRegion || undefined,
      shipPostalCode: this.orderForm.value.shipPostalCode || undefined,
      shipCountry: this.orderForm.value.shipCountry
    };

    this.orderService.createOrder(newOrder)
      .subscribe(
        (data: Order) => {
          alert(`Orden creada exitosamente con ID ${data.orderId}`);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al crear la orden:', error);
          this.errorMessage = 'No se pudo crear la orden. Por favor, intenta nuevamente.';
        }
      );
  }

  // Acceso rápido a los controles del formulario
  get f() {
    return this.orderForm.controls;
  }
}
