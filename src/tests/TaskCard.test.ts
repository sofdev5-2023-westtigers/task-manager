import { describe, expect, it } from 'vitest';
import {render, screen} from '@testing-library/svelte';
import TaskCard from '../lib/components/tasks/TaskCard.svelte';

describe('TaskCard component background', () => {
	it('should render with flex-row style', () => {
		render(TaskCard);
		const clazz = screen.getByTestId('content').getAttribute('class');
		expect(clazz).toContain('flex');
        expect(clazz).toContain('flex-row');
	});
});

describe('TaskCard components', () => {
	it('should render with hidden attribute', () => {
		render(TaskCard);
		const inputName = screen.getByTestId('input') as HTMLInputElement;
        const datePick = screen.getByTestId('datepick') as HTMLInputElement;
		expect(inputName).toHaveProperty('hidden');
        expect(datePick).toHaveProperty('hidden');
	});
});

describe('TaskCard components', () => {
	it('should render with none display style', () => {
		render(TaskCard);
		const inputName = screen.getByTestId('input-edit').getAttribute('style');
        const buttonDone = screen.getByTestId('button-done').getAttribute('style');
		expect(inputName).toContain('none');
        expect(buttonDone).toContain('none');
	});
});