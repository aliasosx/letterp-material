import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import {
  MdcDrawerModule, MdcButtonModule, MdcTopAppBarModule, MdcIconModule, MdcListModule, MdcFabModule,
  MdcSwitchModule, MdcCardModule, MdcTextFieldModule, MdcImageListModule, MdcSelectModule, MdcLinearProgressModule, MdcTabModule,
  MdcTabBarModule, MdcSnackbarModule, MdcRadioModule, MdcDialogModule, MdcDialogRef, MdcElevationModule, MdcTypographyModule, MdcRippleModule
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
import { AddfoodtypeComponent } from './dialogs/addfoodtype/addfoodtype.component';
import { AdddiscountComponent } from './dialogs/adddiscount/adddiscount.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'food', component: FoodComponent },
  { path: 'terminal', component: TerminalComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'pos', component: PosComponent },
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
    AddfoodtypeComponent,
    AdddiscountComponent,

  ],

  entryComponents: [
    ConfirmationComponent,
    AddfoodFormComponent,
    FoodinfoComponent,
    AddfoodtypeComponent,
    AdddiscountComponent,
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
    MdcRippleModule,

  ],
  providers: [
    { provide: MdcDialogRef, useValue: {} },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
