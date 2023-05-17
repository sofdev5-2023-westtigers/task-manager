export async function fetchTasks(listName1) {
    const userId = '123';
    const listName = listName1;
    const res = await fetch(`/api/tasks/getTasks?listName=${listName}`);
    const groupedTasks = await res.json();
    return groupedTasks;
}

export async function obtainTaskGroup(name: any){
    const tasks = await fetchTasks(listName);
    const taskGroup = tasks.find((task: any) => task._id.listName === name);
    return taskGroup.then((result: any) => {
        const list = Array.isArray(result) ? result : [result];
    })
    .catch((error: any) => {
        console.error(error);
    });
}