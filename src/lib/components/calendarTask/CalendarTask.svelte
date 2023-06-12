<script>
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import DayGrid from '@event-calendar/day-grid';
    import List from '@event-calendar/list';
    import TimeGridResource from '@event-calendar/resource-time-grid';
    import '@event-calendar/core/index.css';
    export let tasksEvents;

    let plugins = [TimeGrid, DayGrid, List, TimeGridResource];
    let options = {
        view: 'timeGridWeek',
        height: '800px',
        headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,listWeek'
        },
        buttonText: function (texts) {
                texts.resourceTimeGridWeek = 'resources';
                return texts;
        },
        scrollTime: '00:00:00',
        events: tasksEvents,
        views: {
            timeGridWeek: {pointer: true},
            resourceTimeGridWeek: {pointer: true}
        },
        dayMaxEvents: true,
        nowIndicator: true,
        selectable: false,
        selectBackgroundColor: '#ABC4AA'
    };
</script>

<Calendar {plugins} {options} />
