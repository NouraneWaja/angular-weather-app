import { Component } from '@angular/core';
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

  weatherData: any;

  temp: any;

   // Map
   mapOptions: any;
   map: any;
   userInteraction: boolean = false;
   longitude: any = null;
   latitude: any = null;
   error: boolean = false;

  
  
  constructor(public weatherService:WeatherService){}

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(38, -97),
      zoom: 6,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    };
  }

  onMapReady(map: Map) {
    this.map = map;
    this.setMarker(this.weatherData);
    map.panTo(new L.LatLng(this.latitude, this.longitude));
  }
  setMarker(data: any) {
    this.userInteraction = true;
    this.longitude = data.coord.lon;
    this.latitude = data.coord.lat;
    const marker = new Marker([this.longitude, this.latitude]).setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '/assets/leaflet/marker-icon-2x.png',
      })
    );
    marker.bindTooltip(this.weatherData.name).openTooltip();
  }


  getWeather(){
    this.weatherService.getWeather(this.city)
    .subscribe(
      res=>{
        this.weatherData=res;
        this.temp=this.convertKelvinToCelsius(this.weatherData.main.temp);
        this.setMarker(this.weatherData);
          if (this.map != undefined) {
            this.map.panTo(new L.LatLng(this.latitude, this.longitude));
          }
      },
      err=>{
        this.error = true;
        this.clearData();
      }
    )
  }

  convertKelvinToCelsius(kelvin: number): number {
    return parseFloat((kelvin - 273.15).toFixed(2));
  }
  
  clearData() {
    this.weatherData = null;
    
    this.city = '';
  }

}
