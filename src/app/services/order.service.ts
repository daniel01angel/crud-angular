// src/app/services/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Order {
  orderId?: number;
  customerId: string;
  employeeId?: number;
  orderDate?: string; // Formato YYYY-MM-DD
  requiredDate?: string;
  shippedDate?: string;
  shipVia?: number;
  freight?: number;
  shipName: string;
  shipAddress?: string;
  shipCity?: string;
  shipRegion?: string;
  shipPostalCode?: string;
  shipCountry?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) { }

  // Obtener todas las órdenes
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Obtener una orden por ID
  getOrderById(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Crear una nueva orden
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Actualizar una orden existente
  updateOrder(id: number, order: Order): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, order)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Eliminar una orden por ID
  deleteOrder(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud HTTP:', error);
    // Puedes personalizar el manejo de errores aquí
    return throwError('Ocurrió un error inesperado. Por favor, intenta nuevamente más tarde.');
  }

}
