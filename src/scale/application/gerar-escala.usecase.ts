import { Injectable } from '@nestjs/common';
import { GerarEscalaDto } from './dto/gerar-escala.dto';
import { EscalaDto } from './dto/escala.dto';

@Injectable()
export class GerarEscalaUseCase {
  execute({
    qtdHoursDay,
    initialHourDay,
    qtdMilitaryDay,
    qtdHoursNigth,
    initialHourNigth,
    qtdMilitaryNigth,
    lastMilitaryName,
    allMilitariesName,
  }: GerarEscalaDto): string[] {
    const minutesDayPerMilitary = (qtdHoursDay * 60) / qtdMilitaryDay;

    const listaOrdemEscala = this.geraOrdemEscala(
      allMilitariesName,
      lastMilitaryName,
    );

    const escalaDia = this.geraEscala(
      initialHourDay,
      listaOrdemEscala,
      minutesDayPerMilitary,
      qtdMilitaryDay,
    );

    const minutesNightPerMilitary = (qtdHoursNigth * 60) / qtdMilitaryNigth;

    const escalaNoite = this.geraEscala(
      initialHourNigth,
      listaOrdemEscala,
      minutesNightPerMilitary,
      qtdMilitaryNigth,
    );

    const response = [...escalaDia, ...escalaNoite].map(
      ({ militar, horaInicial, horaFinal }) =>
        `${militar} - ${horaInicial} às ${horaFinal}`,
    );

    return response;
  }

  geraEscala(
    horaAtual: string,
    listaMilitares: string[],
    minutosPorMilitar: number,
    quantidadeMilitares: number,
  ): EscalaDto[] {
    let indexMilitar = 0;
    let horaAtualMilitar = horaAtual;

    const escala: EscalaDto[] = [];

    while (indexMilitar < quantidadeMilitares) {
      let nomeMilitar = listaMilitares[indexMilitar];

      const fimHoraMilitar = this.geraHora(horaAtualMilitar, minutosPorMilitar);

      if (!nomeMilitar) {
        indexMilitar = 0;
        nomeMilitar = listaMilitares[indexMilitar];
      }

      escala.push({
        militar: nomeMilitar,
        horaInicial: horaAtualMilitar,
        horaFinal: fimHoraMilitar,
      });

      horaAtualMilitar = fimHoraMilitar;
      indexMilitar++;
    }

    return escala;
  }

  geraOrdemEscala(nomes: string[], primeiroNome: string) {
    const encontrado = nomes.find(
      (n) => n.toLowerCase() === primeiroNome.toLowerCase(),
    );

    if (!encontrado) {
      throw new Error(`Nome "${primeiroNome}" não encontrado na lista`);
    }

    const ordenados = [...nomes].sort((a, b) => a.localeCompare(b, 'pt-BR'));

    const indice = ordenados.findIndex(
      (n) => n.toLowerCase() === primeiroNome.toLowerCase(),
    );

    // Rotaciona o array a partir do índice encontrado
    return [...ordenados.slice(indice), ...ordenados.slice(0, indice)];
  }

  geraHora(horaStr: string, minutosASomar: number) {
    const [hora, minuto] = horaStr.split(':').map(Number);

    const totalMinutos = hora * 60 + minuto + minutosASomar;
    const h = Math.floor(totalMinutos / 60) % 24; // % 24 trata virada de dia
    const m = totalMinutos % 60;

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }
}
