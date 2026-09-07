import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-temperature-converter',
  imports: [],
  templateUrl: './temperature-converter.html',
  styleUrl: './temperature-converter.css',
})
export class TemperatureConverter {
  // Valore della temperatura inserita.
  temperature = signal('');
  // Unità di partenza e di arrivo.
  fromUnit = signal('');
  toUnit = signal('');
  result = signal<number | null>(null);

  // Verifico se tutti i campi sono compilati.
  canConvert = computed(() => {
    return this.temperature() !== '' && this.fromUnit() !== '' && this.toUnit() !== '';
  });

  // Salvo la temperatura inserita.
  updateTemperature(event: Event) {
    const input = event.target as HTMLInputElement;
    this.temperature.set(input.value);

    // Cancello il risultato prec.
    this.result.set(null);
  }

  // Salvo l'unità di misura di partenza.
  updateFromUnit(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.fromUnit.set(select.value);
    this.result.set(null);
  }

  // Salvo l'unità di arrivo.
  updateToUnit(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.toUnit.set(select.value);
    this.result.set(null);
  }

  // Eseguo la conversione tramite convertTemperature().
  convertTemperature() {
    const value = Number(this.temperature());

    // Prima converto il valore in Celsius.
    let valueInCelsius = value;

    switch (this.fromUnit()) {
      case 'fahrenheit':
        valueInCelsius = ((value - 32) * 5) / 9;
        break;

      case 'kelvin':
        valueInCelsius = value - 273.15;
        break;
    }

    // Poi converto da Celsius nell'unità scelta.
    let convertedValue = valueInCelsius;

    switch (this.toUnit()) {
      case 'fahrenheit':
        convertedValue = (valueInCelsius * 9) / 5 + 32;
        break;

      case 'kelvin':
        convertedValue = valueInCelsius + 273.15;
        break;
    }
    this.result.set(convertedValue);
  }
}

/* In alternativa si potrebbe usare una struttura if / else if.
In questo progetto ho preferito usare lo switch perché permette di separare meglio le due fasi della conversione: prima il valore viene convertito in Celsius e poi nell'unità finale. */
