import { test } from 'vitest';
import { expect } from 'chai';
import {
  dataPieChart,
  dataDonutChart,
  dataBarChart,
  trasformDataPieChart,
  trasformDataDonutChart,
  trasformDataBarChart,
} from '../lib/components/stadistics/transformData';

test('trasformDataPieChart should transform data correctly for pie chart', () => {
  const dataTask = [
    { taskName: 'Task 1', timeChronometer: 10 },
    { taskName: 'Task 2', timeChronometer: 20 },
    { taskName: 'Task 3', timeChronometer: 30 },
  ];

  trasformDataPieChart(dataTask);

  const expectedData = [
    { nameTask: 'Task 1', timeChronometer: 10 },
    { nameTask: 'Task 2', timeChronometer: 20 },
    { nameTask: 'Task 3', timeChronometer: 30 },
  ];

  expect(dataPieChart).to.deep.equal(expectedData);
});

test('trasformDataDonutChart should transform data correctly for donut chart', () => {
  const dataTask = [
    { taskName: 'Task 1', timeChronometer: 10 },
    { taskName: 'Task 2', timeChronometer: 20 },
    { taskName: 'Task 3', timeChronometer: 30 },
  ];

  trasformDataDonutChart(dataTask);

  const expectedData = [
    { nameTask: 'Task 1', timeChronometer: 10 },
    { nameTask: 'Task 2', timeChronometer: 20 },
    { nameTask: 'Task 3', timeChronometer: 30 },
  ];

  expect(dataDonutChart).to.deep.equal(expectedData);
});

test('trasformDataBarChart should transform data correctly for bar chart and calculate percentage', () => {
  const dataTask = [
    { taskName: 'Task 1', timeChronometer: 10 },
    { taskName: 'Task 2', timeChronometer: 20 },
    { taskName: 'Task 3', timeChronometer: 30 },
  ];

  trasformDataBarChart(dataTask);

  const expectedData = [
    { nameTask: 'Task 1', timeChronometer: 0.16666666666666666 },
    { nameTask: 'Task 2', timeChronometer: 0.3333333333333333 },
    { nameTask: 'Task 3', timeChronometer: 0.5 },
  ];

  expect(dataBarChart).to.deep.equal(expectedData);
});

test('trasformDataPieChart should transform dataTask into dataPieChart correctly', () => {
  // Datos de prueba
  const dataTask = [
    { taskName: 'Task 1', timeChronometer: 60 },
    { taskName: 'Task 2', timeChronometer: 120 },
    { taskName: 'Task 3', timeChronometer: 90 },
  ];

  // Ejecuta la función de transformación
  trasformDataPieChart(dataTask);

  // Verifica si los datos se han transformado correctamente
  expect(dataPieChart).not.equal([
    { nameTask: 'Task 1', timeChronometer: 60 },
    { nameTask: 'Task 2', timeChronometer: 120 },
    { nameTask: 'Task 3', timeChronometer: 90 },
  ]);
});

test('trasformDataDonutChart should transform dataTask into dataDonutChart correctly', () => {
  // Datos de prueba
  const dataTask = [
    { taskName: 'Task A', timeChronometer: 200 },
    { taskName: 'Task B', timeChronometer: 300 },
    { taskName: 'Task C', timeChronometer: 150 },
  ];

  // Ejecuta la función de transformación
  trasformDataDonutChart(dataTask);

  // Verifica si los datos se han transformado correctamente
  expect(dataDonutChart).not.equal([
    { nameTask: 'Task A', timeChronometer: 200 },
    { nameTask: 'Task B', timeChronometer: 300 },
    { nameTask: 'Task C', timeChronometer: 150 },
  ]);
});
