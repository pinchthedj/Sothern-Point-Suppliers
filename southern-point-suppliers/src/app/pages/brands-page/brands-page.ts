import { Component } from '@angular/core';

@Component({
  selector: 'app-brands-page',
  imports: [],
  templateUrl: './brands-page.html',
  styleUrl: './brands-page.scss',
})
export class BrandsPage {

  brands = [
    {
      name: 'Google',
      logo: 'assets/brands/google.png'
    },
    {
      name: 'Microsoft',
      logo: 'assets/brands/microsoft.png'
    },
    {
      name: 'Spotify',
      logo: 'assets/brands/spotify.png'
    },
    {
      name: 'Netflix',
      logo: 'assets/brands/netflix.png'
    },
    {
      name: 'Apple',
      logo: 'assets/brands/apple.png'
    },
    {
      name: 'Amazon',
      logo: 'assets/brands/amazon.png'
    }
  ];

}
