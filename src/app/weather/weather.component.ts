import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  weatherData: any;

  onWeatherDataReceived(data: any) {
    this.weatherData = data;
  }
  
}
