import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent, environment } from './app/';

import { Product, ProductService } from './app/shared/product.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ProductService
]);

