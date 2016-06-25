import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

export class Product {
    constructor(public id: number = 0,
        public sku: string = '',
        public nome: string = '',
        public descricao?: string,
        public preco?: number) {
    }
}

export enum CRUD {
    GET,
    POST,
    PUT,
    DELETE
}

@Injectable()
export class ProductService {

    //_productsUrlMock = 'app/data/products.json';
    _productsUrl = 'https://1-3-dot-paulkibenjuguna-1420292.appspot.com/api/produtos';
    headers: Headers;
    options: RequestOptions;

    constructor(private _http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getProducts(): Observable<Product[]> {
        return this._http.get(this._productsUrl)
            .map(res => <Product[]>res.json())
            .do(data => console.log('getProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number) {
        return this._http.get(this._productsUrl + `/${id}`)
            .map(res => this.handleMap(res))
            .do(data => console.log('getProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProduct(product: Product): Observable<Product> {
        let body = JSON.stringify(product);
        return this._http.post(this._productsUrl, body, this.options)
            .map(res => this.handleMap(res))
            .do(data => console.log('saveProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    editProduct(product: Product): Observable<Product> {
        let body = JSON.stringify(product);
        return this._http.put(this._productsUrl + `/${product.sku}`, body, this.options)
            .map(res => this.handleMap(res))
            .do(data => console.log('editProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteProduct(sku: string): Observable<Product> {
        return this._http.delete(this._productsUrl + `/${sku}`)
            .map(res => this.handleMap(res))
            .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    manageProduct(product: Product, op: CRUD): Observable<Product> {
        switch (op) {
            case CRUD.POST:
                return this.saveProduct(product);
        
            case CRUD.PUT:
                return this.editProduct(product);
        
            case CRUD.DELETE:
                return this.deleteProduct(product.sku);
        
            default:
                return this.getProduct(product.id);
        }
    }

    private handleMap(res: any) {
        let data = <Product>res.json();
        if (data === null || Object.keys(data).length <= 0 || data.id === 0) {
            return {
                'id': 0,
                'sku': '',
                'nome': '',
                'descricao': '',
                'preco': 0.0
            };
        }
        return data;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Houver falha na execução desta operação no servidor. Por favor, tente novamente mais tarde.';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}