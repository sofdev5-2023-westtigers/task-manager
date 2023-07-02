import NewTask from "./NewTask.svelte";
import TaskCard from './TaskCard.svelte';

export async function addNewTask(event, name) {
    if (name) {
        const body = new FormData();
        body.append('listName', name);
        const inputNameTask = event.target.parentNode.querySelector('.input-nameTask');
        inputNameTask?.removeAttribute('hidden');
        const inputNameTask1 = event.target.parentNode.querySelector('.button-add');
        inputNameTask1?.removeAttribute('hidden');
        const datepickTask = event.target.parentNode.querySelector('.datepick-select');
        datepickTask?.removeAttribute('hidden');
    }
}

export async function createTask(event, user, name, date, dates, showPickDate, showPickDates, setFalsePicks, taskList, isToggled, isCronometer) {
    const inputElement = document.querySelector('.input-nameTask');
    const inputValue1 = inputElement.value;

    console.log(inputValue1)
    if (inputValue1) {

        let newTask = null;

        const body = new FormData();
        body.append('userId', user.userId.toString());
        body.append('taskName', inputValue1);
        body.append('listName', name);
        body.append('isCompleted', false.toString());
        body.append('timeChronometer', '0');

        if (showPickDate == true) {
            body.append('date', date);
        } else if (showPickDates == true) {
            body.append('dates', dates);
        }

        let members: string[] = [''];
        members.forEach((member) => {
            body.append('listMembers[]', member);
        });

        const result = await fetch('/api/tasks/addTask', {
            method: 'POST', body
        });


        const data = await result.json();
        const taskId = data._id;

        if (showPickDate == true) {
            console.log("showPickDate");
            if (!isToggled) {
                newTask = new NewTask({
                    target: event.target.parentNode.querySelector('.list-Task'),
                    props: { id: taskId, inputValue: inputValue1, containsDate: true, dateValue: date, isTimeChronometer: isCronometer },
                });
            } else {
                newTask = new TaskCard({
                    target: event.target.parentNode.parentNode.parentNode.querySelector('.list-Task'),
                    props: { id: taskId, name: inputValue1, isCompleted: false, containsDate: true, dateValue: date, isTimeChronometer: isCronometer },
                });
            }
        } else if (showPickDates == true) {
            console.log("showPickDates");
            if (!isToggled) {
                newTask = new NewTask({
                    target: event.target.parentNode.querySelector('.list-Task'),
                    props: { id: taskId, inputValue: inputValue1, containsDates: true, dateValue: dates, isTimeChronometer: isCronometer },
                });
            } else {
                newTask = new TaskCard({
                    target: event.target.parentNode.parentNode.parentNode.querySelector('.list-Task'),
                    props: { id: taskId, name: inputValue1, isCompleted: false, containsDates: true, dateValue: dates, isTimeChronometer: isCronometer },
                });
            }
        } else {
            console.log("a")
            if (!isToggled) {
                newTask = new NewTask({
                    target: event.target.parentNode.querySelector('.list-Task'),
                    props: { id: taskId, inputValue: inputValue1, isTimeChronometer: isCronometer },
                });
            } else {
                newTask = new TaskCard({
                    target: event.target.parentNode.parentNode.parentNode.querySelector('.list-Task'),
                    props: { id: taskId, name: inputValue1, isCompleted: false, isTimeChronometer: isCronometer },
                });
            }
        }

        setFalsePicks();

        taskList = [...taskList, newTask];
        inputElement.value = '';

        const inputNameTask = event.target.parentNode.querySelector('.input-nameTask');
        inputNameTask?.setAttribute('hidden', true);
        const datepickTask = event.target.parentNode.querySelector('.datepick-select');
        datepickTask?.setAttribute('hidden', true);
        const inputNameTask1 = event.target.parentNode.querySelector('.button-add');
        inputNameTask1?.setAttribute('hidden', true);
    }
}

export async function saveList(event, user) {
    const parent = this.parentElement;
    const inputs = parent.querySelectorAll('input');
    const labels = parent.querySelectorAll('label');
    const buttons = parent.querySelectorAll('button');
    const oldList = labels[0].textContent;

    if (inputs[0].value == "") {
        inputs[0].value = labels[0].textContent;
    } else {
        labels[0].textContent = inputs[0].value;
    }

    inputs[0].style.display = "none";
    buttons[1].style.display = "none";
    const inputElement = event.target.parentNode.querySelector('.listName-modified');
    const inputValueListName = inputElement.value;

    const body = new FormData();

    body.append('userId', user.userId.toString());
    body.append('listNameOld', oldList);
    body.append('listName', inputValueListName);
    const result = await fetch('/api/tasks/updateList', {
        method: 'PUT', body
    });
    const task = await result.json();
}