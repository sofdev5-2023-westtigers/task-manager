import { render, fireEvent } from '@testing-library/svelte';
import OptionsDate from '../lib/components/calendar/OptionsDate.svelte';
import DeadlineCalendar from '../lib/components/calendar/DeadlineCalendar.svelte';
import SelectDayCalendar from '../lib/components/calendar/SelectDaysCalendar.svelte';

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

    it('Clicking on "No Date" radio input hides the components', async () => {
        const result = render(OptionsDate);

        const noDateInput = result.getByTestId('test-nodate');
        fireEvent.click(noDateInput);

        expect(result.queryByTestId('deadline-calendar')).toBeNull();
        expect(result.queryByTestId('select-day-calendar')).toBeNull();
    });

    it('Clicking on "Deadline" radio input shows the DeadlineCalendar component', async () => {
        const result = render(OptionsDate);

        const deadlineInput = result.getByTestId('test-deadline');
        fireEvent.click(deadlineInput);

        expect(result.queryByTestId('select-day-calendar')).toBe(null);
    });

    it('Clicking on "Due on" radio input shows the SelectDayCalendar component', async () => {
        const result = render(OptionsDate);

        const dueOnInput = result.getByTestId('test-dueon');
        fireEvent.click(dueOnInput);

        expect(result.queryByTestId('deadline-calendar')).toBeNull();
    });

});