import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashbordComponent } from './adminComp/admin-dashbord/admin-dashbord.component';
import { AdminoverviewComponent } from './adminComp/adminoverview/adminoverview.component';
import { UserlistComponent } from './adminComp/userlist/userlist.component';
import { UseraddComponent } from './adminComp/useradd/useradd.component';
import { ProdactlistComponent } from './adminComp/prodactlist/prodactlist.component';
import { ProdactaddComponent } from './adminComp/prodactadd/prodactadd.component';
import { ProdacteditComponent } from './adminComp/prodactedit/prodactedit.component';
import { ShippingComponent } from './adminComp/shipping/shipping.component';
import { OrderComponent } from './adminComp/order/order.component';
import { FeedbackComponent } from './adminComp/feedback/feedback.component';
import { CopondComponent } from './adminComp/copond/copond.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashbordComponent,
    AdminoverviewComponent,
    UserlistComponent,
    UseraddComponent,
    ProdactlistComponent,
    ProdactaddComponent,
    ProdacteditComponent,
    ShippingComponent,
    OrderComponent,
    FeedbackComponent,
    CopondComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
