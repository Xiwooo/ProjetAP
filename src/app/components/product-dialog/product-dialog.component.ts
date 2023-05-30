
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../create-product/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  private backupProduct: Partial<Product> = { ...this.data.product };

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  cancel(): void {
    this.data.product.displayName = this.backupProduct.displayName;
    this.data.product.taille = this.backupProduct.taille;
    this.data.product.couleur = this.backupProduct.couleur;
    this.dialogRef.close(this.data);
  }
}
export interface ProductDialogData {
  product: Partial<Product>;
  enableDelete: boolean;
}

export interface ProductDialogResult {
  product: Product;
  delete?: boolean;
}
