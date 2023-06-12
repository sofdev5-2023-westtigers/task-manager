export let tasksListEvents = [];
export let addedEvent = false;

export function setTaskList(taskList){
    tasksListEvents = [];
    taskList.forEach(task => {
        if(!tasksListEvents.includes(task._id)){
            if (task.date) {
                addNewEventTask(task.taskName,task.date,task.date);
            }else if(task.dates){
                addNewEventTask(task.taskName, task.dates[0], task.dates[1]);
            }
        }
    });
}

export function setAddedEvent(addedEventNew){
    addedEvent = addedEventNew;
}

export function addNewEventTask(newTaskTitle, dateStart, dateEnd){
    const event = {
        start: convertDateFormat(dateStart),
        end: convertDateFormat(dateEnd),
        title: newTaskTitle,
        backgroundColor: generateColorRandom()
    };
    tasksListEvents.push(event);
}

export function generateColorRandom() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
    }
    return color;
}

export function convertDateFormat(dateStr) {
    if (dateStr === "") {
        throw new Error("Invalid date format");
    }

    var parts = dateStr.split("/");
    var year = parts[2];
    var month = parts[0];
    var day = parts[1];
    var newDateStr = year + "-" + month + "-" + day;
    return newDateStr;
}
