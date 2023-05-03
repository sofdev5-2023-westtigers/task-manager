<script>
    import { DatePicker, DatePickerInput } from "carbon-components-svelte";
    import "carbon-components-svelte/css/white.css"
    import { setDates } from "./CalendarOptions";

    function handleDateChange(event) {
        const { selectedDates: [dateFrom], dateStr: { from, to } } = event.detail;
        let selectedDatesValues = [from,to];
        setDates(selectedDatesValues.join('-'));
    }
</script>

<DatePicker class="mt-2" datePickerType="range" on:change on:change={handleDateChange}>
    <DatePickerInput labelText="Start Task" placeholder="mm/dd/yyyy" />
    <DatePickerInput labelText="End Task" placeholder="mm/dd/yyyy" />
</DatePicker>