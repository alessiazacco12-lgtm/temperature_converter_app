import { Component } from '@angular/core';
import { TemperatureConverter } from './components/temperature-converter/temperature-converter';

@Component({
  selector: 'app-root',

  // Importo il componente Temperature Converter.
  imports: [TemperatureConverter],

  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
