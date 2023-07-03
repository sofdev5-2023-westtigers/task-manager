import { render, cleanup } from '@testing-library/svelte';
import '@testing-library/jest-dom/extend-expect'; // Import this line
import TableStadistic from '../lib/components/stadistics/TableStadistic.svelte';

describe('TableStadistic component', () => {
    afterEach(() => {
        cleanup();
    });

    test('should render tasks correctly', () => {
        const { getByText } = render(TableStadistic, {
            dataTask: [
                { taskName: 'Task 1', isCompleted: true, timeChronometer: 5000 },
                { taskName: 'Task 2', isCompleted: false, timeChronometer: 3000 },
            ],
            times: 8000,
        });

        expect(getByText('Task 1')).toBeInTheDocument();
        expect(getByText('Yes')).toBeInTheDocument();
        expect(getByText('5')).toBeInTheDocument();

        expect(getByText('Task 2')).toBeInTheDocument();
        expect(getByText('No')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();

        expect(getByText('Total Seconds')).toBeInTheDocument();
        expect(getByText('8000')).toBeInTheDocument();
    });


});
