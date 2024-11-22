// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';

// Importar FormsModule y ReactiveFormsModule para formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importar RouterModule para enrutamiento
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes generados
import { AppComponent } from './app.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';

// Definir las rutas
const appRoutes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'create-order', component: OrderCreateComponent },
  { path: 'edit-order/:id', component: OrderEditComponent },
  { path: '**', redirectTo: '' } // Redireccionar rutas desconocidas al componente de lista
];

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderCreateComponent,
    OrderEditComponent,
    // Otros componentes si los tienes...
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // Añadido ReactiveFormsModule
    RouterModule.forRoot(appRoutes), // Configurar las rutas
    // Otros módulos si los tienes (como Angular Material)...
  ],
  providers: [
    // Servicios o interceptores si los tienes...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
