import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IProduct } from './product';

@Injectable()
export class ProductService {

    private _productsUrl = 'https://1-3-dot-paulkibenjuguna-1420292.appspot.com/api/produtos';

    constructor(private _http: Http) { }

    getProducts() {
        return this._http.get(this._productsUrl)
            .map(res => <IProduct[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getProduct(id: number) {
        return this._http.get(this._productsUrl)
            .map(res => this.handleMap(res, id))
            .do(data => console.log('Data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private handleMap(res: any, id: number) {
        let data = <IProduct[]>res.json();
        // Return an initialized object
        if (id === 0) {
            return {
                'id': 0,
                'sku': '',
                'nome': '',
                'descricao': '',
                'preco': 0.0
            };
        }
        let filtered = data.filter(m => m.id === id);
        return <IProduct>filtered[0];
    }
}
