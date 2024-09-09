import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashbordComponent } from './adminComp/admin-dashbord/admin-dashbord.component';
import { AdminoverviewComponent } from './adminComp/adminoverview/adminoverview.component';
import { ProdactaddComponent } from './adminComp/prodactadd/prodactadd.component';
import { LoginComponent } from './login/login.component';
import { ProdactlistComponent } from './adminComp/prodactlist/prodactlist.component';
import { ProdacteditComponent } from './adminComp/prodactedit/prodactedit.component';
import { UseraddComponent } from './adminComp/useradd/useradd.component';
import { UserlistComponent } from './adminComp/userlist/userlist.component';
import { OrderComponent } from './adminComp/order/order.component';
import { FeedbackComponent } from './adminComp/feedback/feedback.component';
import { ShippingComponent } from './adminComp/shipping/shipping.component';
import { CopondComponent } from './adminComp/copond/copond.component';
import { GeneratecopComponent } from './adminComp/generatecop/generatecop.component';

const routes: Routes = [

  {path:"", component:LoginComponent},
  {path:"home", component:AdminDashbordComponent},
  {path:"admindash", component:AdminDashbordComponent, children:[
    {path:"adminoverview", component:AdminoverviewComponent},
    {path:"prodactadd", component:ProdactaddComponent},
    {path:"prodactlist", component:ProdactlistComponent},
    {path:":id/editeprodact", component:ProdacteditComponent},
    {path:"useradd", component:UseraddComponent},
    {path:"userlist", component:UserlistComponent},
    {path:"orderlist", component:OrderComponent},
    {path:"feedback", component:FeedbackComponent},
    {path:"shipping", component:ShippingComponent},
    {path:"copond", component:CopondComponent},
    {path:"gencop", component:GeneratecopComponent},

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
