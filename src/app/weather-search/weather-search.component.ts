import { Component,Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../weather.service';
import { icon, latLng, Map, MapOptions, Marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrl: './weather-search.component.css',
})
export class WeatherSearchComponent {

  city:any;

  error: boolean = false;

  @Output() weatherData = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      (res) => {
        this.weatherData.emit(res);
        this.error = false;
      },
      (err) => {
        this.error = true;
        this.clearData();
      }
    );
  }

  clearData() {
    this.weatherData.emit(null);
    this.city = '';
  }

}
