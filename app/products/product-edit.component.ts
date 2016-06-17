import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NumberValidator } from '../shared/number.validator';

@Component({
    templateUrl: 'app/products/product-edit.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ProductEditComponent implements OnActivate {
    pageTitle: string = 'Editar Product';
    editForm: ControlGroup;
    formError: { [id: string]: string };
    private _validationMessages: { [id: string]: { [id: string]: string } };
    product: IProduct;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _productService: ProductService) {

        // Initialization of strings
        this.formError = {
            'sku': '',
            'nome': '',
            'descricao': '',
            'preco': ''
        };

        this._validationMessages = {
            'sku': {
                'required': 'o campo [ SKU ] deve ser preenchido.'
            },
            'nome': {
                'required': 'o campo [ Nome ] deve ser preenchido.'
            },
            'descricao': {
                'required': 'o campo [ Descrição ] deve ser preenchido.'
            },
            'preco': {
                'required': 'o campo [ Preço ] deve ser preenchido.'
            }
        };
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.getProduct(id);
    }

    getProduct(id: number) {
        this._productService.getProduct(id)
            .subscribe(
            product => this.onProductRetrieved(product),
            error => this.errorMessage = <any>error);
    }

    onProductRetrieved(product: IProduct) {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Criar Produto';
        } else {
            this.pageTitle = `Editar Produto: ${this.product.nome}`;
        }

        this.editForm = this._fb.group({
            'sku': [this.product.sku, Validators.compose([Validators.required])],
            'nome': [this.product.nome, Validators.compose([Validators.required])],
            'descricao': [this.product.descricao, Validators.compose([Validators.required])],
            'preco': [this.product.preco, Validators.compose([Validators.required])]
        });

        this.editForm.valueChanges
            .map(value => {
                // Causes infinite loop
                // this.titleControl.updateValue(value.title.toUpperCase());
                value.title = value.title.toUpperCase();
                console.log(value.title);
                return value;
            })
            .subscribe(data => this.onValueChanged(data));
        // this.editForm.valueChanges
        //         .debounceTime(500)
        //         .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data: any) {
        for (let field in this.formError) {
            if (this.formError.hasOwnProperty(field)) {
                let hasError = this.editForm.controls[field].dirty &&
                    !this.editForm.controls[field].valid;
                this.formError[field] = '';
                if (hasError) {
                    for (let key in this.editForm.controls[field].errors) {
                        if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
                            this.formError[field] += this._validationMessages[field][key] + ' ';
                        }
                    }
                }
            }
        }
    }

    saveProduct() {
        console.log(this.editForm);
        if (this.editForm.dirty && this.editForm.valid) {
            this.product = this.editForm.value;
            alert(`Produto: ${JSON.stringify(this.editForm.value)}`);
        }
    }
}
