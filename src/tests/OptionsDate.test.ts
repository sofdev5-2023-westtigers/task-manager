import { render, fireEvent } from '@testing-library/svelte';
import OptionsDate from '../lib/components/calendar/OptionsDate.svelte';

describe('Options Date tests', () => {
    it('No date option for date is displayed', async () => {
        const result = render(OptionsDate);

        const input = result.getByTestId('test-nodate');
        expect(input.hidden).toBe(false);
    });

    it('Deadline option for date is displayed', async () => {
        const result = render(OptionsDate);

        const input = result.getByTestId('test-deadline');
        expect(input.hidden).toBe(false);
    });

    it('Due on option for date is displayed', async () => {
        const result = render(OptionsDate);

        const input = result.getByTestId('test-dueon');
        expect(input.hidden).toBe(false);
    });

});