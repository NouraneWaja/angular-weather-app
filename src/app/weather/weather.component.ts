import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  weatherData: any;

  constructor(public weatherService: WeatherService) {}

  onWeatherDataReceived(data: any) {
    this.weatherData = data;
  }
  
}
