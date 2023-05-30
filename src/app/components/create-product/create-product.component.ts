import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './create-product.component.html',
  //styleUrls: ['./carte-fidelite.component.scss']
})
export class ProductComponent {
  @Input() product: Product | null = null;
  @Output() editProduct = new EventEmitter<Product>();
}
