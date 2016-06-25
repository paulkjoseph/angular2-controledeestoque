import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MD_BUTTON_DIRECTIVES, MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_INPUT_DIRECTIVES, MdInput } from '@angular2-material/input';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { MD_TOOLBAR_DIRECTIVES, MdToolbar } from '@angular2-material/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { Product, CRUD, ProductService } from './shared/product.service';

class Menu {
  constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public icon: string = '') {

  }
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES, MdButton,
    MD_CARD_DIRECTIVES,
    MD_CHECKBOX_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_INPUT_DIRECTIVES, MdInput,
    MD_LIST_DIRECTIVES,
    MD_PROGRESS_BAR_DIRECTIVES,
    MD_RADIO_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_SLIDE_TOGGLE_DIRECTIVES,
    MD_TABS_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES, MdToolbar,
    MdIcon
  ],
  providers: [
    MdIconRegistry
  ]
})
export class AppComponent implements OnInit {

  title = 'Controle de Estoque';
  menus: Menu[] = [];

  formShowing: boolean = false;
  products: Product[] = [];
  product: Product = new Product(0, '', '');
  loading: boolean = false;

  errorMessage: any = null;

  constructor(private _service: ProductService) {
    this.getMenu();
  }

  ngOnInit() {
    this.getProducts();
  }

  create(): void {
    this.product = new Product(0, '', '');
    this.formShowing = !this.formShowing;
    this.title = 'Novo Produto';
  }

  edit(product: Product) {
    this.formShowing = true;
    this.product = product;
    this.title = `Editar Produto: ${this.product.nome}`;
  }

  save(form) {
    this.formShowing = false;

    let operation = this.product.id === null || this.product.id === 0 ? CRUD.POST : CRUD.PUT;
    
    this.loading = true;
    this._service.manageProduct(this.product, operation)
      .subscribe(
      (data: Product) => { //-- on sucess
        this.product = data;
      },
      error => { //-- on error
        this.loading = false;
        this.errorMessage = <any>error;
      },
      () => { //-- on completion
        this.loading = false;
        switch (operation) {
          case CRUD.POST:
            console.log("Salvar novo produto: " + JSON.stringify(this.product));
            this.products.push(this.product);
            break;
        
          case CRUD.POST:
            console.log("Editar produto:: " + JSON.stringify(this.product));
            break;
        
          default:
            break;
        }
      }
      );
  }

  delete(product: Product) {
    this.loading = true;
    this._service.manageProduct(product, CRUD.DELETE)
      .subscribe(
      (data: Product) => { //-- on sucess
        this.product = data;
      },
      error => { //-- on error
        this.loading = false;
        this.errorMessage = <any>error;
      },
      () => { //-- on completion
        this.getProducts();
        //this.products.splice(this.products.indexOf(this.product), 1);
      }
      );
  }

  selectedOption(menu: Menu): void {
    switch (menu.id) {
      case 1:
        this.formShowing = false;
        this.getProducts();
        break;

      case 2:
        this.create();
        break;

      default:
        break;
    }
  }

  private getProducts(): void {
    this.loading = true;
    this._service.getProducts()
      .subscribe(
      (data: Product[]) => { //-- on sucess
        this.products = data;
      },
      error => { //-- on error
        this.loading = false;
        this.errorMessage = <any>error;
      },
      () => { //-- on completion
        this.loading = false;
      }
      );
  }

  private getMenu(): void {
    this.menus = [
      {
        id: 1,
        name: "Listar",
        description: "Listar a relação de produtos",
        icon: "view_list"
      },
      {
        id: 2,
        name: "Cadastrar",
        description: "Cadastrar um novo produto",
        icon: "add_shopping_cart"
      }
    ];
  }
}
