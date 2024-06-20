import { Component,Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrl: './weather-search.component.css',
})
export class WeatherSearchComponent {

  city:any;

  constructor(private weatherService: WeatherService,private snackBar: MatSnackBar) {}

  @Output() weatherData = new EventEmitter<any>();

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      (res) => {
        this.weatherData.emit(res);
      },
      (err) => {
        this.showErrorMessage('Incorrect city name. Please try again.');
        this.clearData();
      }
    );
  }

  clearData() {
    this.weatherData.emit(null);
    this.city=null;
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // La durée pendant laquelle le message est affiché
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
