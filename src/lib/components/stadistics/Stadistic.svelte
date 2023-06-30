<script lang="ts">
  import TableStadistic from './TableStadistic.svelte';
  import Header from '../header/Header.svelte';
  import BarChartV from './BarChartV.svelte';
  import DonutChart from './DonutChart.svelte';
  import PieChart from './PieChart.svelte';
  import { goto } from '$app/navigation';

  export let nameList = '';
  export let tasks: any[] = [];
  export let totalTimes:number;

  let isBarChartV = false;
  let isDonutChart = false;
  let isPieChart = true;
  let totalTimetasks = 0;

  const handleClick = () => {
    const url = `/todo-lists/${nameList}`;
    goto(url, { target: '_blank' });
  };

  function chooseGraphBarV() {
    isBarChartV = true;
    isDonutChart = false;
    isPieChart = false;
  }

  function chooseGraphPieChart() {
    isBarChartV = false;
    isDonutChart = false;
    isPieChart = true;
  }

  function chooseGraphDonutChart() {
    isBarChartV = false;
    isDonutChart = true;
    isPieChart = false;
  }

  function taskComplete(): number {
    let numberTaskCOmplete = 0;
    
    tasks.forEach((element) => {
      if (element.isCompleted === true) {
        numberTaskCOmplete += 1;
      }
    });

    return numberTaskCOmplete;
  }

</script>

<Header />

<div style="padding-top:80px;">
  <div
    id="containerTable"
    class="flex items-center place-items-center"
    style="margin: 40px"
  >
    <div class="flex items-center space-x-2">
      <button class="border border-gray-500 rounded-lg p-2" on:click={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <span class="font-bold text-4xl">{nameList}</span>
      <span class="text-3xl" style="padding-left:10px">General Report</span>
    </div>
  </div>

  <div
  id="containerTable"
  class="flex justify-center justify-items-center place-content-center place-items-center mt-3"
    >
    <div class="flex flex-wrap justify-center" style="padding-top: 30px;">
      <div class="flex place-items-center rounded-md" style="height: 580px; width: 900px; border: 3px solid #D9D9D9; padding-left: 20px; padding-right: 20px; margin-right: 10px; margin-left: 10px; margin-top: 10px;">
        <div class="stats" style="margin-left: 0px;">
          <div class="stat">
            <div class="stat-title">General Report For {nameList}</div>
            <div class="stat-value">Total Task: {tasks.length}</div>
            {#each tasks as task}
              {#if tasks[tasks.length - 1]._id === task._id}
                <div class="stat-desc">Task Complete: {taskComplete()}/{tasks.length}</div>
                <div
                  class="radial-progress mt-3 mb-9"
                  style="--value:{(taskComplete() * 100) /
                    tasks.length}; --size:12rem; --thickness: 2rem;"
                >
                  {((taskComplete() * 100) / tasks.length).toFixed(2)}%
                </div>
              {/if}
            {/each}
          </div>
          </div>
          <div class="ml-6">
            <TableStadistic dataTask={tasks} times={totalTimes}/>
          </div>
        </div>
        <div class = " place-items-center p-5 rounded-md" id="containerCharts" style="float: right; border:3px solid #D9D9D9; margin-left: 10px; margin-right: 10px; margin-top: 10px; width: 780px; height: 580px">
          {#if (totalTimes == 0)}
          <span class=" flex place-items-center p-4 mt-4 text-2xl">Complete your tasks to see the graphics!</span>
          {:else}
          <div class=" pt-2" style="text-align: center;">
            <button class="btn btn-primary btn-radio" data-selected={isBarChartV} on:click={chooseGraphBarV}
              >Bar Chart Vertical</button
            >
            <button
              class="btn btn-primary btn-radio"
              data-selected={isPieChart}
              on:click={chooseGraphPieChart}>Pie Chart</button
            >
            <button
              class="btn btn-primary btn-radio"
              data-selected={isDonutChart}
              on:click={chooseGraphDonutChart}>Donut Chart</button
            >
          </div>

          <div id="containerCharts" class=" p-2 flex place-content-center">
            {#each tasks as task}
              {#if tasks[tasks.length - 1]._id === task._id}
                {#if isBarChartV}
                  <div id="containerCharts" class="flex justify-center place-items-center" style="width: 480px; height:480px;">
                    <BarChartV />
                  </div>
                {/if}
                {#if isDonutChart}
                  <DonutChart />
                {/if}
                {#if isPieChart}
                  <PieChart />
                {/if}
              {/if}
            {/each}
          </div>
          {/if}
        </div>

      </div>
    </div>

  <style>
    .btn-radio {
      background-color: white;
      color: #abc4aa;
      border-color: #abc4aa;
    }

    .btn-radio[data-selected='true'] {
      background-color: #abc4aa;
      color: white;
    }
  </style>
</div>