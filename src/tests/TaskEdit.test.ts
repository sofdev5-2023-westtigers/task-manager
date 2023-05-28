import '@testing-library/jest-dom'

import { test, expect } from "vitest";
import { render, screen, fireEvent } from '@testing-library/svelte';
import NewTask from "../lib/components/tasks/NewTask.svelte";

test('show function updates input', async () => {
    render(NewTask, {inputValue: 'test'})
    const label = screen.getByTestId('label-name') as HTMLInputElement;
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    await fireEvent.click(label);

    expect(input.value).toBe('test');
})

test('show function shows elements', async () => {
    render(NewTask, {inputValue: 'test'})
    const label = screen.getByTestId('label-name') as HTMLInputElement;
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;
    await fireEvent.click(label);

    expect(input).toHaveStyle('display: inline');
    expect(button).toHaveStyle('display: inline');
})