import { Component } from '@angular/core';
import { CartapiService } from '../../services/cartapi.service';
import { Products } from '../../models/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productList: Products [] =[]
  constructor(private cartApi: CartapiService){

  }
  ngOnInit(){
    this.cartApi.fetchProducts().subscribe(product => {
      this.productList = product;
    })
    
    
  }

  addToCart(product: Products): void{
    this.cartApi.addToCart(product);
    
  }
  toggleWishlist(product: Products){
    if(this.isWishlist(product)){
      this.cartApi.removeWishlist(product);
    }else{
      this.cartApi.addWishlist(product)
    }
  }

  isWishlist(product: Products) : boolean{
    return this.cartApi.isInWishlist(product)
  }

  

}
