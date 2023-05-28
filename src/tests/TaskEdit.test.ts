import '@testing-library/jest-dom'

import { test, expect } from "vitest";
import {render, screen, fireEvent, act} from '@testing-library/svelte';
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

test('save function updates label content', async () => {
    render(NewTask, {inputValue: 'test'})
    const label = screen.getByTestId('label-name') as HTMLInputElement;
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;

    await act(() => fireEvent.input(input, { target: { value: 'data' } }));
    await fireEvent.click(button);

    expect(label.textContent).toBe('data');
})

test('save function keeps label content', async () => {
    render(NewTask, {inputValue: 'test'})
    const label = screen.getByTestId('label-name') as HTMLInputElement;
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;

    await act(() => fireEvent.input(input, { target: { value: '' } }));
    await fireEvent.click(button);

    expect(label.textContent).toBe('test');
})

test('save function hides elements', async () => {
    render(NewTask, {inputValue: 'test'})
    const label = screen.getByTestId('label-name') as HTMLInputElement;
    const input = screen.getByTestId('input-name') as HTMLInputElement;
    const button = screen.getByTestId('button-name') as HTMLInputElement;
    await fireEvent.click(button);

    expect(input).toHaveStyle('display: none');
    expect(button).toHaveStyle('display: none');
})