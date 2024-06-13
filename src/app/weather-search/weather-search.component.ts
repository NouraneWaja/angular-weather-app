import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrl: './weather-search.component.css'
})
export class WeatherSearchComponent {

  city:any;
  
  constructor(private weatherService:WeatherService){}
  
  getWeather(){
    this.weatherService.getWeather(this.city)
    .subscribe(
      res=>{
        this.weatherService.weatherData=res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

}
