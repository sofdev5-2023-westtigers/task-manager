export let dataPieChart = [];
export let dataDonutChart = [];
export let dataBarChart = [];

export function trasformDataPieChart(dataTask){
    dataPieChart = dataTask
        .filter(task => task.timeChronometer !== 0)
        .map(task => ({ nameTask: task.taskName, timeChronometer: task.timeChronometer }));
}

export function trasformDataDonutChart(dataTask){
    dataDonutChart = dataTask
        .filter(task => task.timeChronometer !== 0)
        .map(task => ({ nameTask: task.taskName, timeChronometer: task.timeChronometer }));
}

export function trasformDataBarChart(dataTask){
    dataBarChart = dataTask
        .filter(task => task.timeChronometer !== 0)
        .map(task => ({ nameTask: task.taskName, timeChronometer: task.timeChronometer }));

    transformForPercentage();
}


function transformForPercentage(){
    let totalsum = 0;
    dataBarChart.forEach(element => {
        totalsum += element.timeChronometer;
    });
    for (let i = 0; i < dataBarChart.length; i++) {
        dataBarChart[i].timeChronometer = dataBarChart[i].timeChronometer / totalsum;
    }
}
