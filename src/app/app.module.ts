import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import {
  MdcDrawerModule, MdcButtonModule, MdcTopAppBarModule, MdcIconModule, MdcListModule, MdcFabModule,
  MdcSwitchModule, MdcCardModule, MdcTextFieldModule, MdcImageListModule, MdcSelectModule, MdcLinearProgressModule,
} from '@angular-mdc/web';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PosComponent } from './pages/pos/pos.component';
import { LoginComponent } from './pages/login/login.component';
import { FoodComponent } from './pages/food/food.component';
import { TerminalComponent } from './pages/terminal/terminal.component';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'food', component: FoodComponent },
  { path: 'terminal', component: TerminalComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    DashboardComponent,
    PosComponent,
    LoginComponent,
    FoodComponent,
    TerminalComponent,
    
  ],
  imports: [
    BrowserModule,
    MdcDrawerModule,
    MdcButtonModule,
    MdcTopAppBarModule,
    MdcIconModule,
    MdcListModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    MdcFabModule,
    MdcSwitchModule,
    MdcCardModule,
    MdcTextFieldModule,
    MdcImageListModule,
    MdcSelectModule,
    MdcLinearProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
