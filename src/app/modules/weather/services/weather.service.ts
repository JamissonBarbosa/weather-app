import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '6382bcc26479515eedc5eecb7474992f';

  constructor(private httpClient: HttpClient) { }

  getWeatherData(cityName: string): Observable<any> {
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`, {});
  }

}
