import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {FireOrderComponent} from './components/fire-order/fire-order.component';
import {FireBalanceComponent} from './components/fire-balance/fire-balance.component';
import {FireBalanceProvider} from './providers/fire-balance.provider';
import {GetPriceComponent} from './components/get-price/get-price.component';
import {HttpClientModule} from '@angular/common/http';
import {PRICESProvider} from './providers/prices.provider';


@NgModule({
  declarations: [
    AppComponent,
    FireOrderComponent,
    FireBalanceComponent,
    GetPriceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    PRICESProvider,
    FireBalanceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
