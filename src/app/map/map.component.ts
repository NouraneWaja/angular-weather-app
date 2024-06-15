import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { icon, latLng, Map, MapOptions, Marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  @Input() weatherData: any;
  
  mapOptions: any;
  map: any;
  marker: any;
  longitude: any = null;
  latitude: any = null;
  userInteraction: boolean = false;

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


  ngOnChanges(changes: SimpleChanges) {
    if (changes['weatherData'] && this.weatherData) {
      this.updateMap();
    }
  }

  private updateMap() {
    if (this.map && this.weatherData) {
      const { lat, lon } = this.weatherData.coord;

      // Update map center
      this.map.setView([lat, lon], 6);

      // Update marker position and tooltip
      this.marker.setLatLng([lat, lon]);
      this.marker.bindTooltip(this.weatherData.name).openTooltip();
    }
  }


}
