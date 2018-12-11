import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes, PreloadingStrategy, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import {
  MdcDrawerModule, MdcButtonModule, MdcTopAppBarModule, MdcIconModule, MdcListModule, MdcFabModule,
  MdcSwitchModule, MdcCardModule, MdcTextFieldModule, MdcImageListModule, MdcSelectModule, MdcLinearProgressModule, MdcTabModule,
  MdcTabBarModule, MdcSnackbarModule, MdcRadioModule, MdcDialogModule, MdcDialogRef, MdcElevationModule, MdcTypographyModule, MdcRippleModule, MdcMenuModule, MdcMenuSurfaceModule,
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
import { CustomersComponent } from './dialogs/customers/customers.component';
import { CustomerFilter } from './pipes/customersFilter';
import { CustomerTelePhoneFilterPipe } from './pipes/customer-tele-phone-filter.pipe';
import { PaymentConfirmComponent } from './dialogs/payment-confirm/payment-confirm.component';
import { UpdatefoodtypeComponent } from './dialogs/updatefoodtype/updatefoodtype.component';
import { OrdertrackingComponent } from './pages/ordertracking/ordertracking.component';
import { PrintreceiptComponent } from './pages/printreceipt/printreceipt.component';
import { Page404Component } from './pages/page404/page404.component';
import { PrintReciptComponent } from './dialogs/print-recipt/print-recipt.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './dialogs/add-user/add-user.component';
import { UserEditComponent } from './dialogs/user-edit/user-edit.component';
import { KitchenMonitorComponent } from './pages/kitchen-monitor/kitchen-monitor.component';
import { GroupByPipe } from './pipes/groupBy.pipe';
import { ProfileComponent } from './pages/profile/profile.component';
import { FirstloginComponent } from './dialogs/firstlogin/firstlogin.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { TimeRemainigPipe } from './pipes/time-remainig.pipe';
import { AddnoteComponent } from './dialogs/addnote/addnote.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'food', component: FoodComponent },
  { path: 'terminal', component: TerminalComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'pos', component: PosComponent },
  { path: 'tracking', component: OrdertrackingComponent },
  { path: 'print', component: PrintreceiptComponent },
  { path: 'users', component: UsersComponent },
  { path: 'kitchenmon', component: KitchenMonitorComponent },
  { path: '**', component: Page404Component },


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
    CustomersComponent,
    CustomerFilter,
    CustomerTelePhoneFilterPipe,
    PaymentConfirmComponent,
    UpdatefoodtypeComponent,
    OrdertrackingComponent,
    PrintreceiptComponent,
    Page404Component,
    PrintReciptComponent,
    UsersComponent,
    AddUserComponent,
    UserEditComponent,
    KitchenMonitorComponent,
    GroupByPipe,
    ProfileComponent,
    FirstloginComponent,
    FooterComponent,
    TimeRemainigPipe,
    AddnoteComponent,


  ],

  entryComponents: [
    ConfirmationComponent,
    AddfoodFormComponent,
    FoodinfoComponent,
    AddfoodtypeComponent,
    AdddiscountComponent,
    CustomersComponent,
    PaymentConfirmComponent,
    UpdatefoodtypeComponent,
    PrintReciptComponent,
    AddUserComponent,
    UserEditComponent,
    FirstloginComponent,
    AddnoteComponent,
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
    MdcMenuModule,
    MdcMenuSurfaceModule,

  ],
  providers: [
    { provide: MdcDialogRef, useValue: {} },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
