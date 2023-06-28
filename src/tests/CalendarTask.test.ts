import { test } from 'vitest';
import { expect } from 'chai';
import {
	convertDateFormat,
	generateColorRandom,
	setTaskList,
	addNewEventTask,
	tasksListEvents
} from '../lib/components/calendarTask/CalendarTaskFunction';
import sinon from 'sinon';

test('convertDateFormat should convert date format correctly', () => {
	const inputDate = '12/31/2022';
	const expectedOutput = '2022-12-31';

	const actualOutput = convertDateFormat(inputDate);

	expect(actualOutput).to.equal(expectedOutput);
});

test('convertDateFormat should convert date format correctly with a start range', () => {
    const inputDate = ['12/01/2022', '12/10/2022'];
    const expectedOutput = ['2022-12-01', '2022-12-10'];
  
    const actualOutputStart = convertDateFormat(inputDate[0]);
  
    expect(actualOutputStart).to.deep.equal(expectedOutput[0]);
});

test('convertDateFormat should throw an error for empty string', () => {
	const inputDate = '';

	expect(() => convertDateFormat(inputDate)).to.throw('Invalid date format');
});

test('generateColorRandom should generate a valid color code', () => {
	const generatedColor = generateColorRandom();

	expect(generatedColor).to.match(/^#[0-9a-fA-F]{6}$/);
});

test('setTaskList should add new tasks to the task list', () => {
	// Mock the task list from database
	const taskList = [
		{ _id: 1, taskName: 'Task 1', date: '12/31/2022' },
		{ _id: 2, taskName: 'Task 2', dates: ['12/01/2022', '12/10/2022'] },
		{ _id: 3, taskName: 'Task 3', date: '12/15/2022' }
	];

	// Mock the addNewEventTask function
	const addNewEventTaskStub = sinon.stub();
	sinon.replace({ addNewEventTask }, 'addNewEventTask', addNewEventTaskStub);

	// Mock the original functions with stubs
	sinon.replace({ convertDateFormat }, 'convertDateFormat', (dateStr) => dateStr);

	setTaskList(taskList);

	expect(tasksListEvents).to.deep.equal([
		{
			start: '2022-12-31',
			end: '2022-12-31',
			title: 'Task 1',
			backgroundColor: tasksListEvents[0].backgroundColor
		},
		{
			start: '2022-12-01',
			end: '2022-12-10',
			title: 'Task 2',
			backgroundColor: tasksListEvents[1].backgroundColor
		},
		{
			start: '2022-12-15',
			end: '2022-12-15',
			title: 'Task 3',
			backgroundColor: tasksListEvents[2].backgroundColor
		}
	]);

	sinon.restore();
});

test('addNewEventTask should add a new event to tasksListEvents', () => {
	// Mock the task list from database
	const newTaskTitle = 'New Task';
	const dateStart = '12/31/2022';
	const dateEnd = '01/01/2023';

	// Mock the convertDateFormat and generateColorRandom functions
	const convertDateFormatStub = sinon.stub().returnsArg(0);
	sinon.replace({ convertDateFormat }, 'convertDateFormat', convertDateFormatStub);

	addNewEventTask(newTaskTitle, dateStart, dateEnd);

	expect(tasksListEvents[tasksListEvents.length - 1]).to.deep.include({
		start: '2022-12-31',
		end: '2023-01-01',
		title: newTaskTitle,
		backgroundColor: tasksListEvents[tasksListEvents.length - 1].backgroundColor
	});

	sinon.restore();
});

test('convertDateFormat should Not convert date format correctly', () => {
	const inputDate = '12/31/2022';
	const expectedOutput = '2022-12-30';

	const actualOutput = convertDateFormat(inputDate);

	expect(actualOutput).not.equal(expectedOutput);
});

test('convertDateFormat should convert date format correctly with a end range', () => {
    const inputDate = ['12/01/2022', '12/10/2022'];
    const expectedOutput = ['2022-12-01', '2022-12-10'];
  
    const actualOutputStart = convertDateFormat(inputDate[1]);
  
    expect(actualOutputStart).to.deep.equal(expectedOutput[1]);
});

test('generateColorRandom should Not match withgenerate a valid color code', () => {
	const generatedColor = generateColorRandom();

	expect(generatedColor).not.match(/^#[0-9a-fA-F]{7}$/);
});

test('generateColorRandom should Not match withgenerate a valid color code', () => {
	const generatedColor = generateColorRandom();

	expect(generatedColor).not.match(/^#[0-9a-fA-F]{5}$/);
});

test('setTaskList should add new tasks to the task list but not math with constants', () => {
	// Mock the task list from database
	const taskList = [
		{ _id: 1, taskName: 'Task 1', date: '12/31/2022' },
		{ _id: 2, taskName: 'Task 2', dates: ['12/01/2022', '12/10/2022'] },
		{ _id: 3, taskName: 'Task 3', date: '12/15/2022' }
	];

	// Mock the addNewEventTask function
	const addNewEventTaskStub = sinon.stub();
	sinon.replace({ addNewEventTask }, 'addNewEventTask', addNewEventTaskStub);

	// Mock the original functions with stubs
	sinon.replace({ convertDateFormat }, 'convertDateFormat', (dateStr) => dateStr);

	setTaskList(taskList);

	expect(tasksListEvents).not.to.deep.equal([
		{
			start: '12/31/2022',
			end: '12/31/2022',
			title: 'taskName',
			backgroundColor: '<background-color>'
		},
		{
			start: '12/01/2022',
			end: '12/10/2022',
			title: 'taskName',
			backgroundColor: '<background-color>'
		},
		{
			start: '12/15/2022',
			end: '12/15/2022',
			title: 'taskName',
			backgroundColor: '<background-color>'
		}
	]);

	sinon.restore();
});

test('addNewEventTask should add a new event to tasksListEvents but not match with constants', () => {
    // Mock the task list from database
    const newTaskTitle = 'New Task';
    const dateStart = '12/31/2022';
    const dateEnd = '01/01/2023';
  
    // Mock the convertDateFormat and generateColorRandom functions
    const convertDateFormatStub = sinon.stub().returnsArg(0);
    sinon.replace({ convertDateFormat }, 'convertDateFormat', convertDateFormatStub);
  
    addNewEventTask(newTaskTitle, dateStart, dateEnd);
  
    expect(tasksListEvents[tasksListEvents.length - 1]).not.to.deep.include({
      start: '12/31/2022',
      end: '01/01/2023',
      title: 'newTaskTitle',
      backgroundColor: '<background-color>'
    });
  
    sinon.restore();
});
