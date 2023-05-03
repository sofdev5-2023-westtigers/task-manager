<script>
    import { DatePicker, DatePickerInput } from "carbon-components-svelte";
    import "carbon-components-svelte/css/white.css";
    import { setDate } from "./CalendarOptions";
    function handleDateChange(event) {
        setDate(event.detail.dateStr);
    }
</script>

<DatePicker class="mt-2" datePickerType="single" on:change={handleDateChange}>
    <DatePickerInput class="datepickerInput" placeholder="mm/dd/yyyy" />
</DatePicker>
