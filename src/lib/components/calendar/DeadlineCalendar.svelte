<script context="module">
    import { DatePicker, DatePickerInput } from "carbon-components-svelte";
    import "carbon-components-svelte/css/white.css";

    export let selectedDate = '';

    function handleDateChange(event) {
        const dateStr = event.detail.dateStr;
        selectedDate = dateStr;
    }

    export function getdate(){
        return selectedDate;
    }
</script>

<DatePicker datePickerType="single" on:change={handleDateChange}>
    <DatePickerInput class="datepickerInput" placeholder="mm/dd/yyyy" />
</DatePicker>
