import {
    setDate,
    setDates,
    setFalsePicks,
    getDate,
    getDates,
    getShowPickDate,
    getShowPickDates
} from '../lib/components/calendar/CalendarOptions';

describe('Calendar options test suit', () => {
    it('It should initially have empty values', () => {
        expect(getDate()).toEqual('');
        expect(getDates()).toEqual([]);
        expect(getShowPickDate()).toBe(false);
        expect(getShowPickDates()).toBe(false);
    });

    it('Should set date correctly', () => {
        const newDate = '2023-07-01';
        setDate(newDate);
        expect(getDate()).toEqual(newDate);
        expect(getShowPickDate()).toBe(true);
    });

    it('Should set dates correctly', () => {
        const newDates = ['2023-07-01', '2023-07-02'];
        setDates(newDates);
        expect(getDates()).toEqual(newDates);
        expect(getShowPickDates()).toBe(true);
    });

    it('Should deactivate date selection', () => {
        setFalsePicks();
        expect(getShowPickDate()).toBe(false);
        expect(getShowPickDates()).toBe(false);
    });

    it('It should set a correct date even after setted newDates', () => {
        const newDates = ['2023-07-01', '2023-07-02'];
        setDates(newDates);
        const newDate = '2023-07-03';
        setDate(newDate);
        expect(getDate()).toEqual(newDate);
        expect(getShowPickDate()).toBe(true);
        expect(getDates()).toEqual(newDates);
        expect(getShowPickDates()).toBe(true);
    });

    it('It should deactivate dates selection after setting single date', () => {
        const newDate = '2023-07-01';
        setDate(newDate);
        setFalsePicks();
        expect(getShowPickDate()).toBe(false);
        expect(getShowPickDates()).toBe(false);
    });
});