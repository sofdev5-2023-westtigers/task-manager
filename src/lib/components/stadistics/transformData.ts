export let dataPieChart = [];
export let dataDonutChart = [];
export let dataBarChart = [];

export function trasformDataPieChart(dataTask){
    for (let i = 0; i < dataTask.length; i++) {
        const newData = {nameTask: dataTask[i].taskName, timeChronometer: dataTask[i].timeChronometer};
        dataPieChart[i] = newData;
    }
}

export function trasformDataDonutChart(dataTask){
    for (let i = 0; i < dataTask.length; i++) {
        const newData = {nameTask: dataTask[i].taskName, timeChronometer: dataTask[i].timeChronometer};
        dataDonutChart[i] = newData;
    }
}

export function trasformDataBarChart(dataTask){
    for (let i = 0; i < dataTask.length; i++) {
        const newData = {nameTask: dataTask[i].taskName, timeChronometer: dataTask[i].timeChronometer};
        dataBarChart[i] = newData;
    }
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
