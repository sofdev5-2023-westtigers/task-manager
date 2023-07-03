<script>
    import { DatePicker, DatePickerInput } from "carbon-components-svelte";
   
    import "carbon-components-svelte/css/white.css";
    import { setDates } from "./CalendarOptions";
  
    let isDateValid = true;
  
    function handleDateChange(event) {
      const currentDate = new Date();
      const { selectedDates: [dateFrom], dateStr: { from, to } } = event.detail;
      const selectedFromDate = new Date(from);
      const selectedToDate = new Date(to);
  
      if (selectedFromDate < currentDate || selectedToDate < currentDate) {
        isDateValid = false;
        return;
      }
  
      isDateValid = true;
  
      let selectedDatesValues = [from, to];
      setDates(selectedDatesValues.join("-"));
    }
  </script>
  
  <DatePicker class="mt-2" datePickerType="range" on:change on:change={handleDateChange}>
    <div>
      <DatePickerInput labelText="Start Task" placeholder="mm/dd/yyyy" style="width: 150px;"/>
      <DatePickerInput labelText="End Task" placeholder="mm/dd/yyyy" style="width: 150px;"/>
    </div>
  
    {#if !isDateValid}
      <p style="color: red;">Invalid date</p>
    {/if}
  </DatePicker>
  