<script>
    import { DatePicker, DatePickerInput } from "carbon-components-svelte";
    import { setDate } from "./CalendarOptions";
  
    let currentDate = new Date().toISOString().slice(0, 10);
    let isDateValid = true;
  
    function handleDateChange(event) {
      const { value, validity } = event.target;
      const selectedDate = new Date(value).toISOString().slice(0, 10);
      isDateValid = validity.valid && selectedDate > currentDate;
  
      if (isDateValid) {
        setDate(selectedDate);
      } else {
        setDate("");
      }
    }
  </script>
  
  <DatePicker class="mt-2" datePickerType="single">
    <DatePickerInput
      class="datepickerInput"
      placeholder="mm/dd/yyyy"
      invalid={!isDateValid}
      invalidText="Invalid date"
      style="width: 150px;"
      on:input={handleDateChange}
    />
  </DatePicker>
  