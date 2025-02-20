import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/WeatherData';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  initialCity = 'são Paulo';
  weatherData!: WeatherData;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) { }



  ngOnInit(): void {
    this.listCities(this.initialCity);
  }

  listCities(cityName: string): void {
    this.weatherService.getWeatherData(cityName)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          response && (this.weatherData = response);
          console.log(this.weatherData);
        },
        error: (error) => {
          console.error(error);
        }
      })
  }

  searchCity(cityName: string): void {
    cityName = this.initialCity;
    this.listCities(cityName);
    this.initialCity = '';
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


