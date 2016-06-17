System.register(['@angular/core', '@angular/common', '@angular/router', './product.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, product_service_1;
    var ProductEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (product_service_1_1) {
                product_service_1 = product_service_1_1;
            }],
        execute: function() {
            ProductEditComponent = (function () {
                function ProductEditComponent(_fb, _productService) {
                    this._fb = _fb;
                    this._productService = _productService;
                    this.pageTitle = 'Editar Product';
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
                ProductEditComponent.prototype.routerOnActivate = function (curr) {
                    var id = +curr.getParam('id');
                    this.getProduct(id);
                };
                ProductEditComponent.prototype.getProduct = function (id) {
                    var _this = this;
                    this._productService.getProduct(id)
                        .subscribe(function (product) { return _this.onProductRetrieved(product); }, function (error) { return _this.errorMessage = error; });
                };
                ProductEditComponent.prototype.onProductRetrieved = function (product) {
                    var _this = this;
                    this.product = product;
                    if (this.product.id === 0) {
                        this.pageTitle = 'Criar Produto';
                    }
                    else {
                        this.pageTitle = "Editar Produto: " + this.product.nome;
                    }
                    this.editForm = this._fb.group({
                        'sku': [this.product.sku, common_1.Validators.compose([common_1.Validators.required])],
                        'nome': [this.product.nome, common_1.Validators.compose([common_1.Validators.required])],
                        'descricao': [this.product.descricao, common_1.Validators.compose([common_1.Validators.required])],
                        'preco': [this.product.preco, common_1.Validators.compose([common_1.Validators.required])]
                    });
                    this.editForm.valueChanges
                        .map(function (value) {
                        // Causes infinite loop
                        // this.titleControl.updateValue(value.title.toUpperCase());
                        value.title = value.title.toUpperCase();
                        console.log(value.title);
                        return value;
                    })
                        .subscribe(function (data) { return _this.onValueChanged(data); });
                    // this.editForm.valueChanges
                    //         .debounceTime(500)
                    //         .subscribe(data => this.onValueChanged(data));
                };
                ProductEditComponent.prototype.onValueChanged = function (data) {
                    for (var field in this.formError) {
                        if (this.formError.hasOwnProperty(field)) {
                            var hasError = this.editForm.controls[field].dirty &&
                                !this.editForm.controls[field].valid;
                            this.formError[field] = '';
                            if (hasError) {
                                for (var key in this.editForm.controls[field].errors) {
                                    if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
                                        this.formError[field] += this._validationMessages[field][key] + ' ';
                                    }
                                }
                            }
                        }
                    }
                };
                ProductEditComponent.prototype.saveProduct = function () {
                    console.log(this.editForm);
                    if (this.editForm.dirty && this.editForm.valid) {
                        this.product = this.editForm.value;
                        alert("Produto: " + JSON.stringify(this.editForm.value));
                    }
                };
                ProductEditComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/products/product-edit.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, product_service_1.ProductService])
                ], ProductEditComponent);
                return ProductEditComponent;
            }());
            exports_1("ProductEditComponent", ProductEditComponent);
        }
    }
});
//# sourceMappingURL=product-edit.component.js.map