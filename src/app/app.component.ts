import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CountryInterface } from './models/country.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'binary-search-visualisation';
  http = inject(HttpClient);
  countries: CountryInterface[] = [];

  foundCountry: CountryInterface = { city: '', country: '' };
  currentCountry: string = '';
  currentCapital: string = '';
  iterations = 0;

  ngOnInit() {
    this.http
      .get<CountryInterface[]>(`countries.json`)
      .subscribe((countries) => (this.countries = countries));
  }

  public searchForCountry() {
    let index = this.binarySearch(
      this.countries,
      this.currentCountry,
      'country'
    );
    this.foundCountry = this.countries[index];
  }

  public searchForCapital() {
    let index = this.binarySearch(this.countries, this.currentCapital, 'city');
    this.foundCountry = this.countries[index];

    console.log(this.foundCountry);

    let sorted = this.countries.sort(function (a, b) {
      return a.city.localeCompare(b.city);
    });

    console.log(sorted);
  }

  public binarySearch(
    arr: CountryInterface[],
    target: string,
    mode: keyof CountryInterface
  ) {
    this.iterations = 0;
    let start = 0;
    let iterations = 0;
    let end = arr.length - 1;
    while (start <= end) {
      iterations++;
      let middle = Math.floor((start + end) / 2);

      console.log(arr[middle][mode], mode, middle, target);
      if (arr[middle][mode] < target) {
        // Search the right half
        start = middle + 1;
      } else if (arr[middle][mode] > target) {
        // Search the left half
        end = middle - 1;
      } else if (arr[middle][mode] === target) {
        // Found target
        this.iterations = iterations;
        return middle;
      }
    }
    // Target not found
    return -1;
  }
}
