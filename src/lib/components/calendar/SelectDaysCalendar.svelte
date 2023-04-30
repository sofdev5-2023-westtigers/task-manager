<script context="module">
    import { DatePicker, DatePickerInput } from "carbon-components-svelte";
    import "carbon-components-svelte/css/white.css"
    export let selectedDatesValue = '';

    function handleDateChange(event) {
        const { selectedDates: [dateFrom], dateStr: { from, to } } = event.detail;
        selectedDatesValue = from + ' - ' + to;
    }
</script>

<DatePicker datePickerType="range" on:change on:change={handleDateChange}>
    <DatePickerInput labelText="Start Task" placeholder="mm/dd/yyyy" />
    <DatePickerInput labelText="End Task" placeholder="mm/dd/yyyy" />
</DatePicker>