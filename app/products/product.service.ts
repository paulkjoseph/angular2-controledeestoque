import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IProduct } from './product';

@Injectable()
export class ProductService {

    private _productsUrl = 'app/products/products.json';

    constructor(private _http: Http) { }

    getProducts() {
        return this._http.get(this._productsUrl)
            .map(res => <IProduct[]>res.json())
            .do(data => console.log('Data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number) {
        return this._http.get(this._productsUrl)
            .map(res => this.handleMap(res, id))
            .do(data => console.log('Data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Houver falha na execução desta operação no servidor. Por favor, tente novamente mais tarde.');
    }

    private handleMap(res: any, id: number) {
        let data = <IProduct[]>res.json();
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
