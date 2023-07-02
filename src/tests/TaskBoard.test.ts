import { describe, expect, it, test } from 'vitest';
import { fireEvent, render, screen, waitFor} from '@testing-library/svelte';
import TaskBoard from '../lib/components/tasks/TaskBoard.svelte';

describe('TaskBoard component background', () => {
	it('should render with correct background color', () => {
		render(TaskBoard, {
			props: {
				name: 'Test Board',
				inputValue: [],
				isToggled: false
			}
		});

		const boardElement = screen.getByTestId('content-board');
		const boardLabel = screen.getByText('Test Board');


		expect(boardElement).not.toEqual(null);
		expect(boardLabel).not.toEqual(null);
	
		const computedStyles = window.getComputedStyle(boardElement);
		expect(computedStyles.backgroundColor).toEqual('rgb(242, 242, 242)');
	});
});

describe('TaskBoard task and name render', () => {
	it('should render category header with correct name', () => {
		render(TaskBoard, { name: 'Test Category' });
		const categoryHeader = screen.getByText('Test Category');
		expect(() => screen.getByText('Test Category')).not.toThrow();
		expect(categoryHeader).to.exist;
	});

	it('should render individual tasks', () => {
		render(TaskBoard, { inputValue: [{ taskName: 'Task 1' }, { taskName: 'Task 2' }] });
		const task1 = screen.getByText('Task 1');
		const task2 = screen.getByText('Task 2');
		expect(task1).to.exist;
		expect(task2).to.exist;
	});

	it('should show the new task form when the "+" button is clicked', async () => {
		render(TaskBoard);
		const addButton = screen.getByText('+ New');
		fireEvent.click(addButton);
		const taskNameInput = await screen.findByTestId('input-name-task');
		expect(taskNameInput).to.exist;
	});
});