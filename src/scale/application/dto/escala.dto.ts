export class EscalaDto {
  militar: string;
  horaInicial: string;
  horaFinal: string;

  constructor(militar: string, horaInicial: string, horaFinal: string) {
    this.militar = militar;
    this.horaInicial = horaInicial;
    this.horaFinal = horaFinal;
  }
}
