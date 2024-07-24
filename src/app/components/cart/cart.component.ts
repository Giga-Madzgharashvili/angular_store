import { Component } from '@angular/core';
import { Products } from '../../models/products';
import { CartapiService } from '../../services/cartapi.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Products[] = [];
  totalAmount: number = 0;

  constructor(private cartApi: CartapiService){}

  ngOnInit(){
    this.cartItems = this.cartApi.getCartItems();
    this.calculateAmount();
    
  }

  calculateAmount(){
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeProduct(product: Products): void{
    this.cartApi.removeCartItem(product);
    this.calculateAmount();
  }
}
