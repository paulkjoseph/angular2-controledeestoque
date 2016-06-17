import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate, RouteSegment } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-detail.component.html',
    styleUrls: ['app/products/product-detail.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class ProductDetailComponent implements OnActivate {
    pageTitle: string = 'Detalhes de Produto';
    product: IProduct;
    errorMessage: string;

    constructor(private _productService: ProductService,
                private _router: Router) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.getProduct(id);
    }

    getProduct(id: number) {
        this._productService.getProduct(id)
            .subscribe(
                product => this.product = product,
                error => this.errorMessage = <any>error);
    }

    onBack() {
        this._router.navigate(['/products']);
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
}
