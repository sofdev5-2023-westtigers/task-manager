import '@testing-library/jest-dom'

import { test, expect } from "vitest";
import { render, screen, fireEvent, act } from '@testing-library/svelte';
import NewTask from "../lib/components/tasks/NewTask.svelte";



test('save function keeps label content', async () => {
    render(NewTask, { inputValue: 'test' })
    const label = screen.getByTestId('label-name') as HTMLInputElement;
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;

    await act(() => fireEvent.input(input, { target: { value: '' } }));
    await fireEvent.click(button);

    expect(label.textContent).toBe('test');
})


test('save function hides elements', async () => {
    render(NewTask, { inputValue: 'test' })
    const label = screen.getByTestId('label-name') as HTMLInputElement;
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;
    await fireEvent.click(button);

    expect(input).toHaveStyle('display: none');
    expect(button).toHaveStyle('display: none');
})


test('save function keeps label content', async () => {
    render(NewTask, { inputValue: 'test' });
    const label = screen.getByTestId('label-name') as HTMLInputElement;
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;

    await act(async () => {
        fireEvent.input(input, { target: { value: '' } });
        fireEvent.click(button);
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for component updates
    });

    expect(label.textContent).toBe('test');
});


test('save function hides elements', async () => {
    render(NewTask, { inputValue: 'test' });
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;

    await act(async () => {
        fireEvent.click(button);
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for component updates
    });

    expect(input).not.toBeVisible();
    expect(button).not.toBeVisible();
});


test('input value updates on change', async () => {
    render(NewTask);
    const input = screen.getByTestId('input-name') as HTMLInputElement;

    await act(async () => {
        fireEvent.input(input, { target: { value: 'new value' } });
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for component updates
    });

    expect(input.value).toBe('new value');
});


test('save function clears input value', async () => {
    render(NewTask, { inputValue: 'test' });
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;

    await act(async () => {
        fireEvent.click(button);
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for component updates
    });

    expect(input.value).toBe('');
});


test('input loses focus after save button is clicked', async () => {
    render(NewTask);
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;
    await act(async () => {
        fireEvent.click(button);
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for component updates
    });

    expect(document.activeElement).not.toBe(input);
});

test('input value updates on change', async () => {
    render(NewTask);
    const input = screen.getByTestId('input-name') as HTMLInputElement;

    await act(async () => {
        fireEvent.input(input, { target: { value: 'new value' } });
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for component updates
    });

    expect(input.value).toBe('new value');
});


test('save function clears input value', async () => {
    render(NewTask, { inputValue: 'test' });
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLButtonElement;
    await act(async () => {
        fireEvent.click(button);
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for component updates
    });
    expect(input.value).toBe('');
});


test('input loses focus after save button is clicked', async () => {
    render(NewTask);
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLButtonElement;
    await act(async () => {
        fireEvent.click(button);
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for component updates
    });
    expect(document.activeElement).not.toBe(input);
});
