export async function saveTask(event, user, lisName) {
    try {

        const parent = event.target.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        const oldValue = labels[0].textContent;

        let oldChecked = false;
        if (inputs[1].value == "") {
            inputs[1].value = labels[0].textContent;
        } else {
            labels[0].textContent = inputs[1].value;
        }

        buttons[0].style.display = "none";
        inputs[1].style.display = "none";
        const inputElement = event.target.parentNode.querySelector('.task-modified');
        const inputValueTask = inputElement.value;
        const checkbox = event.target.parentNode.querySelector('.checkbox');
        const isChecked = checkbox.checked;
        if (isChecked) {
            oldChecked = false;
        }

        const body = new FormData();
        body.append('userId', user.userId.toString());
        body.append('taskNameOld', oldValue);
        body.append('taskName', inputValueTask);
        body.append('isCompletedOld', oldChecked.toString());
        body.append('isCompleted', isChecked.toString());
        body.append('listName', lisName);

        const result = await fetch('/api/tasks/updateTasks', {
            method: 'PUT', body
        });
        const task = await result.json();
        console.log(task);

        labels[0].style.display = "inline";
        console.log("label", labels[0]);
    }
    catch (error) {
        console.log("handled save error");
    }
}

export function showTasks() {
    const parent = this.parentElement;
    const inputs = parent.querySelectorAll('input');
    const labels = parent.querySelectorAll('label');
    const buttons = parent.querySelectorAll('button');
    inputs[1].value = labels[0].textContent
    buttons[0].style.display = "inline";
    inputs[1].style.display = "inline";

    labels[0].style.display = "none";
}

export async function saveCalendar(event, user, date, dates, prevDate, prevDates, lisName, taskName) {
    let oldDateElem = event.target.parentNode.querySelector('span');
    let oldDate = oldDateElem.textContent;
    const body = new FormData();

    body.append('userId', user.userId.toString());

    if (date !== prevDate && dates === prevDates) {
        body.append('date', date);
        body.append('dates', '');
        oldDateElem.textContent = date;
    } else if (date === prevDate && dates !== prevDates) {
        body.append('date', '');
        body.append('dates', String(dates));
        oldDateElem.textContent = String(dates);
    }

    if (!oldDate.includes("-")) {
        body.append('oldDate', oldDate);
        body.append('oldDates', '');
    } else {
        body.append('oldDate', '');
        body.append('oldDates', oldDate);
    }

    body.append('listName', lisName);
    body.append('taskName', taskName);
    body.append('modifyDate', 'true');

    const result = await fetch('/api/tasks/updateTasks', {
        method: 'PUT', body
    });

    const datepickTask = event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.datepick-select');
    datepickTask?.setAttribute('hidden', true);
    const saveButton = event.target;
    saveButton?.setAttribute('hidden', true);
}

export function showCalendar(event) {
    const datepickTask = event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.datepick-select');
    datepickTask?.removeAttribute('hidden');
    const saveButton = event.target.parentNode.parentNode.querySelector('[name="save"]');
    saveButton?.removeAttribute('hidden');
}

export function formatDate(dateString) {
    dateString = dateString.slice(0, 10);
    const parts = dateString.split("-");
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
    return formattedDate;
}