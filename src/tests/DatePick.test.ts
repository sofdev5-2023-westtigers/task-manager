import { fireEvent, render, waitFor } from '@testing-library/svelte';
import DatePick from '../lib/components/calendar/DatePick.svelte'
import { getRB } from '../lib/components/calendar/DatePick.svelte';

describe('DateInputContainer', () => {
    it('Verify input has descriptive placeholder', async () => {
        const result = render(DatePick);

        const input = result.getByPlaceholderText('Select a date…');
        expect(input).not.toEqual(null);
    });

    it('Radiobuttons are hidden initially', async () => {
        const result = render(DatePick);
        const input = result.getByPlaceholderText('Select a date…');
        const showRadioButtons = input.hidden

        expect(showRadioButtons).toBe(false);
    });
});