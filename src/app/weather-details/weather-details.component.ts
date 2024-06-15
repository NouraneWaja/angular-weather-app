import { Component, Input  } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent {

  @Input() weatherData: any;

  convertKelvinToCelsius(kelvin: number): number {
    return parseFloat((kelvin - 273.15).toFixed(2));
  }
}
