import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey='e2e4ac3a6533ab87f2366eaa5f1bd0f5';

  weatherData: any;

  constructor(private http:HttpClient) { }

  getWeather(city: string){
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+this.apiKey)
  }
}
