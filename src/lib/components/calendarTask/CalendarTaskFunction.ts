export let tasksListEvents = [];

export let addedEvent = true;

export function setTaskList(taskList){
    taskList.forEach(task => {
        if (task.date) {
            addNewEventTask(task.taskName,task.date,task.date);
        }else if(task.dates){
            let date = convertDatesFormat(task.dates);
            addNewEventTask(task.taskName, date[0], date[1]);
        }
    });
}

export function falseAddedEvent(){
    addedEvent = false;
}

export function addNewEventTask(newTaskTitle, dateStart, dateEnd){
    const event = {
        start: convertDateFormat(dateStart),
        end: convertDateFormat(dateEnd),
        title: newTaskTitle,
        backgroundColor: generateColorRandom()
    };
    addedEvent = true;
    tasksListEvents.push(event);
}

function generateColorRandom() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
    }
    return color;
}

function convertDateFormat(dateStr) {
    var parts = dateStr.split("/");
    var year = parts[2];
    var month = parts[0];
    var day = parts[1];
    var newDateStr = year + "-" + month + "-" + day;
    return newDateStr;
}

export function convertDatesFormat(dateStr) {
    return dateStr.split("-");
}