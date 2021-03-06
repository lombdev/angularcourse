import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { CardService } from '../cards/card.service';
import { ICard } from '../cards/card';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  deckId: string;
  cards: ICard[] = [];
  
  pageTitle: string = 'Products List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];

    constructor(private productService: ProductService, private cardService: CardService) {
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    draw(): void {
      this.cardService.draw(this.deckId).subscribe(
        data => {
          this.cards.push(data["cards"].pop());
        }
      );
    }

    ngOnInit(): void {
      this.cardService.getDeck().subscribe(
        data => {
          this.deckId = data["deck_id"];
          console.log(data);
        }
      );

      this.productService.getProducts().subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error => this.errorMessage = <any>error
      );
    }
}