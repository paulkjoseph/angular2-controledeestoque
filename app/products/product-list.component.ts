import { Component, OnInit }  from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductFilterPipe } from './productFilter.pipe';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css'],
    directives: [ ROUTER_DIRECTIVES ],
    pipes: [ ProductFilterPipe ]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Lista de Produtos';
    listFilter: string = '';
    showImage: boolean = false;
    products: IProduct[];
    errorMessage: string;

    constructor(private _productService: ProductService) {
    }

    ngOnInit() { this.getProducts(); }

    getProducts() {
        this._productService.getProducts()
            .subscribe(
            products => this.products = products,
            error => this.errorMessage = <any>error);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
}