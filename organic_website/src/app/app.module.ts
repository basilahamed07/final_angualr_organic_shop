import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormControl } from '@angular/forms';
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
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import { GeneratecopComponent } from './adminComp/generatecop/generatecop.component';
import { CaroselComponent } from './LandingPage/carosel/carosel.component';
import { AboutPAgeComponent } from './LandingPage/about-page/about-page.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { TeamsComponent } from './LandingPage/teams/teams.component';
import { ScroolComponent } from './LandingPage/scrool/scrool.component';
import { FeedbackformComponent } from './LandingPage/feedbackform/feedbackform.component';
import { NavbarComponent } from './LandingPage/navbar/navbar.component';
import { CatagoryComponent } from './LandingPage/catagory/catagory.component';
import { ListprojectComponent } from './LandingPage/listproject/listproject.component';
import { AnalysisChartComponent } from './adminComp/analysis-chart/analysis-chart.component';

 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AnalysisProdactComponent } from './adminComp/analysis-prodact/analysis-prodact.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { EmailtestComponent } from './emailtest/emailtest.component';
import { Error404Component } from './error404/error404.component';
// import { ThankyouComponent } from './check_out/thankyou/thankyou.component';
import { ViewCartComponent } from './check_out/view-cart/view-cart.component';
import { ViewOrdersComponent } from './check_out/view-orders/view-orders.component.spec';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { IgxCategoryChartModule } from 'igniteui-angular-charts';

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
    CopondComponent,
    LoginComponent,
    GeneratecopComponent,
    CaroselComponent,
    AboutPAgeComponent,
    UserprofileComponent,
    TeamsComponent,
    ScroolComponent,
    FeedbackformComponent,
    NavbarComponent,
    CatagoryComponent,
    ListprojectComponent,
    AnalysisChartComponent,
    AnalysisProdactComponent,
    LoadingpageComponent,
    EmailtestComponent,
    Error404Component,
    // ThankyouComponent,
    ViewCartComponent,
    ViewOrdersComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CanvasJSAngularChartsModule,
    CommonModule,
    IgxCategoryChartModule

    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
