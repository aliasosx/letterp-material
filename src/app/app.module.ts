import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import {
  MdcDrawerModule, MdcButtonModule, MdcTopAppBarModule, MdcIconModule, MdcListModule, MdcFabModule,
  MdcSwitchModule, MdcCardModule, MdcTextFieldModule, MdcImageListModule, MdcSelectModule, MdcLinearProgressModule, MdcTabModule,
  MdcTabBarModule, MdcSnackbarModule, MdcRadioModule, MdcDialogModule, MdcDialogRef, MdcElevationModule, MdcTypographyModule,
} from '@angular-mdc/web';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PosComponent } from './pages/pos/pos.component';
import { LoginComponent } from './pages/login/login.component';
import { FoodComponent } from './pages/food/food.component';
import { TerminalComponent } from './pages/terminal/terminal.component';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';
import { AddfoodFormComponent } from './dialogs/addfood-form/addfood-form.component';
import { FoodinfoComponent } from './dialogs/foodinfo/foodinfo.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'food', component: FoodComponent },
  { path: 'terminal', component: TerminalComponent },
  { path: 'administrator', component: AdministratorComponent },
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
    AdministratorComponent,
    ConfirmationComponent,
    AddfoodFormComponent,
    FoodinfoComponent,

  ],

  entryComponents: [
    ConfirmationComponent,
    AddfoodFormComponent,
    FoodinfoComponent,
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
    MdcTabModule,
    MdcTabBarModule,
    MdcSnackbarModule,
    MdcRadioModule,
    MdcDialogModule,
    MdcElevationModule,
    MdcTypographyModule,

  ],
  providers: [
    { provide: MdcDialogRef, useValue: {} },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
