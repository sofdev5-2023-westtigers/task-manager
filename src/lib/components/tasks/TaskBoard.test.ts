import { describe, expect, it, test } from 'vitest';
import {render, screen} from '@testing-library/svelte';
import TaskBoard from './TaskBoard.svelte';

describe('TaskBoard component background', () => {
	it('should render with white background color', () => {
		render(TaskBoard);
		const clazz = screen.getByTestId('content-element').getAttribute('class');
		expect(() => screen.getByTestId('content-element')).not.toThrow();
		expect(clazz).toContain('white');
	});
});
  

test('Input and button to add tasks should be hidden', async () => {
    render(TaskBoard);
    const inputName = screen.getByTestId('input-name-task') as HTMLInputElement;
    const buttonAdd = screen.getByTestId('button-add') as HTMLInputElement;
    expect(inputName).toHaveProperty('hidden');
    expect(buttonAdd).toHaveProperty('hidden');
});