import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './product';

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

    transform(value: IProduct[], filter: string): IProduct[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((product: IProduct) =>
            product.nome.toLocaleLowerCase().search(filter) !== -1) : value;
    }
}
