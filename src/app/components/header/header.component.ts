import { Component } from '@angular/core';
import { CartapiService } from '../../services/cartapi.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private cartApi: CartapiService){}

  getCartItemCount(): number{
    return this.cartApi.getCartItemCount();
  }
}
