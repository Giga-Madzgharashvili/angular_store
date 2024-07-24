import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  private cardItems: Products[] = [];
  private wishListItem: Products[] = [];
  private storageKey = 'cartItems';
  private storageWishlistItems = 'wishlistitems';

  constructor(private http: HttpClient, private notificationService: NotificationService) {
    const storedItem = localStorage.getItem(this.storageKey);
    const storageWishlistItems = localStorage.getItem(this.storageWishlistItems)
    if(storedItem){
      this.cardItems = JSON.parse(storedItem);
    }
    if(storageWishlistItems){
      this.wishListItem = JSON.parse(storageWishlistItems)
    }
   }

   private updateLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cardItems));
    localStorage.setItem(this.storageWishlistItems, JSON.stringify(this.wishListItem))
  }

  fetchProducts():Observable<Products []>{
    return this.http.get<Products []>('https://fakestoreapi.com/products');
  }

  addToCart(product: Products){
    const exsistingItem = this.cardItems.find(item => item.id === product.id);

    if(exsistingItem){
      exsistingItem.quantity +=1;
      this.notificationService.showSuccess(`${product.title} already in the cart.
        Quantity Update: ${product.quantity}`)
    } else{
      product.quantity =1;
      this.cardItems.push(product);
      this.updateLocalStorage();
      this.notificationService.showSuccess(`${product.title} added in the cart`);
      
      
    }
    // localStorage.setItem('cartItems', JSON.stringify(this.cardItems));
  }

  getCartItemCount(): number{
    return this.cardItems.length
  }

  getCartItems(): Products[]{
    return this.cardItems;
  }

  removeCartItem(product: Products): void{
    const index = this.cardItems.findIndex(item => item.id === product.id);
    if(index !== -1){
      this.cardItems.splice(index, 1);
      this.updateLocalStorage();
      this.notificationService.showSuccess('Product remove from the cart');
    }
  }

  isInWishlist(product: Products): boolean{
    return this.wishListItem.some(item => item.id === product.id);
  }

  addWishlist(product: Products): void{
    this.wishListItem.push(product)
    this.updateLocalStorage();
    this.notificationService.showSuccess(`${product.title} add wishlist`);
  }

  removeWishlist(product: Products): void{
    const index = this.wishListItem.findIndex(item => item.id === product.id);
    if(index !== -1 ){
      this.wishListItem.splice(index, 1);
      this.updateLocalStorage();
      this.notificationService.showSuccess(`${product.title} remove from wishlist`);
    }
  }
}
