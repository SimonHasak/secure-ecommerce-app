import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationPanelUserComponent } from './navigation-panel/navigation-panel-user/navigation-panel-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PicturesSliderComponent } from './main-page/pictures-slider/pictures-slider.component';
import { HomePageProductsComponent } from './main-page/home-page-products/home-page-products.component';
import { ProductOutlookComponent } from './product-outlook/product-outlook.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MainPageComponent } from './main-page/main-page.component';
import { NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {MatBadgeModule} from '@angular/material/badge';
import { EmptyHyperlinkDirective } from './shared/directives/empty-hyperlink.directive';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './user/login/login.component';
import { AdvertisementPanelComponent } from './main-page/advertisement-panel/advertisement-panel.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {CommonModule} from "@angular/common";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { NgxSpinnerModule } from "ngx-spinner";
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PaymentAndShipmentComponent } from './shopping-cart/payment-and-shipment/payment-and-shipment.component';
import {MatSelectModule} from '@angular/material/select';
import { CustomerDetailsFormComponent } from './shopping-cart/customer-details-form/customer-details-form.component';
import {TokenInterceptor} from "./shared/interceptors/token.interceptor";
import {HttpErrorInterceptor} from "./shared/interceptors/http-error-interceptor.service";
import {CookieService} from "ngx-cookie-service";
import { SearchWindowComponent } from './navigation-panel/navigation-panel-user/search-window/search-window.component';
import { SocialLinksBannerComponent } from './main-page/social-links-banner/social-links-banner.component';
import { JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import { SafeHtmlPipe } from './shared/pipes/safe-html-pipe';
import { CartItemAddedToCartModalComponent } from './modals/cart-item-added-to-cart-modal/cart-item-added-to-cart-modal.component';
import { InfiniteSlideshowComponent } from './main-page/infinite-slideshow/infinite-slideshow.component';
import { NavigationPanelAdminComponent } from './navigation-panel/navigation-panel-admin/navigation-panel-admin.component';
import {NavigationPanelComponent} from "./navigation-panel/navigation-panel.component";
import { SearchResultsComponent } from './search-results/search-results.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationPanelUserComponent,
    PicturesSliderComponent,
    HomePageProductsComponent,
    ProductOutlookComponent,
    CategoryComponent,
    FooterComponent,
    MainPageComponent,
    ProductDetailsComponent,
    EmptyHyperlinkDirective,
    ShoppingCartComponent,
    LoginComponent,
    AdvertisementPanelComponent,
    SignUpComponent,
    PaymentAndShipmentComponent,
    CustomerDetailsFormComponent,
    SearchWindowComponent,
    SocialLinksBannerComponent,
    SafeHtmlPipe,
    CartItemAddedToCartModalComponent,
    InfiniteSlideshowComponent,
    NavigationPanelAdminComponent,
    NavigationPanelComponent,
    SearchResultsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    MatBadgeModule,
    NgbTooltipModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [CookieService, JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500, horizontalPosition: "center", verticalPosition: "top"}}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    NavigationPanelUserComponent,
    EmptyHyperlinkDirective,
    SafeHtmlPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
