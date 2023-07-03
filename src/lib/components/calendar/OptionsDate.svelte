<script>
    import DeadLineCalendar from "./DeadlineCalendar.svelte";
    import SelectDayCalendar from "./SelectDaysCalendar.svelte";
    let showPickDate = false;
    let showDates = false;

    function toggleNoDate() {
        showPickDate = true;
        showDates = false;
        showPickDate = false;

        const labels = getLabels();
        labels.selectDaysLabel.textContent = "Select Day";
        labels.selectDayLabel.textContent = "Deadline";
    }

    function togglePickDate() {
        showPickDate = true;
        showDates = false;
        const labels = getLabels();
        labels.selectDaysLabel.textContent = "Select Day";
        labels.selectDayLabel.textContent = "Select date for Task:";
    }

    function toggleShowDates() {
        showDates = true;
        showPickDate = false;

        const labels = getLabels();
        labels.selectDayLabel.textContent = "Deadline";
        labels.selectDaysLabel.textContent = "Select start and end date for Task:";
    }

    function getLabels() {
        const selectDaysLabel = document.querySelector('label[for="selectDay"]');
        const selectDayLabel = document.querySelector('label[for="deadLine"]');
        return {
            selectDaysLabel,
            selectDayLabel
        }
    }
</script>

<li class="title-List font-bold mt-2">Due on</li>
<div class="ml-2 mt-2">
    <input data-testid="test-nodate" type="radio" name="DueOnOption" id="NoDate" value="NoDate" on:change={toggleNoDate}/>
    <label for="NoDate">No Date</label>
</div>
<div class="deadlineradiobutton ml-2 mt-2">
    <input data-testid="test-deadline" type="radio" name="DueOnOption" id="deadLine" value="deadLine" on:change={togglePickDate} />
    <label for="deadLine">Deadline</label>
    {#if showPickDate}
        <div data-testid="deadline-calendar">
            <DeadLineCalendar/>
        </div>
    {/if}
</div>
<div class="ml-2 mt-2">
    <input data-testid="test-dueon" type="radio" name="DueOnOption" id="selectDay" value="selectDay" on:change={toggleShowDates} />
    <label for="selectDay">Select Day</label>
    {#if showDates}
        <div data-testid="select-day-calendar">
            <SelectDayCalendar />
        </div>
    {/if}
</div>
