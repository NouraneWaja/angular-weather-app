import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private weatherService: WeatherService) {}

  toggleMap(show:boolean){
    this.weatherService.show=show;
  }
}
