<script lang="ts">
	import TableStadistic from './TableStadistic.svelte';
	import Header from '../header/Header.svelte';
	import BarChartV from './BarChartV.svelte';
	import DonutChart from './DonutChart.svelte';
	import PieChart from './PieChart.svelte';
	import { goto } from '$app/navigation';

	export let nameList = '';
	export let tasks = [];

	let isBarChartV = false;
	let isDonutChart = false;
	let isPieChart = true;

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

<div id="containerCharts" style="float: right; padding-top:80px;">
	<div
		style="margin-left: 400px; font-size: 34px; font-weight: bold; color: black;"
		class="stat-value"
	>
		overview
	</div>

	<div id="containerRadioOptions" style="float: left; margin-top:300px; margin-left: -118px;">
		<div class="form-control">
			<input
				type="radio"
				name="radio-10"
				class="radio checked:bg-gray-800"
				on:change={chooseGraphBarV}
			/>
			<span class="label-text">Bar Chart Vertical</span>
		</div>
		<div class="form-control">
			<input
				type="radio"
				name="radio-10"
				class="radio checked:bg-gray-800 mt-3"
				on:change={chooseGraphPieChart}
			/>
			<span class="label-text">Pie Chart</span>
		</div>
		<div class="form-control">
			<input
				type="radio"
				name="radio-10"
				class="radio checked:bg-gray-800 mt-3"
				on:change={chooseGraphDonutChart}
			/>
			<span class="label-text">Donut Chart</span>
		</div>
	</div>
	<div id="containerCharts" style="float: right; width: 78%; margin-right: 80px;">
		{#each tasks as task}
			{#if tasks[tasks.length - 1]._id === task._id}
				{#if isBarChartV}
					<div id="containerCharts" style="margin-top: 190px;">
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
</div>

<div
	id="containerTable"
	style="float: left; margin-left: 20px; margin-top: 10px; padding-top:80px;"
>
	<button class="btn btn-outline btn-secundary" on:click={handleClick}>Return List</button>
</div>

<div id="containerTable"  style="float: left; margin-top: 100px; margin-left: -30px; padding-top:80px;">
  <div class="stats shadow ml-40">
    <div class="stat">
      <div class="stat-title">General Report For {nameList}</div>
      <div class="stat-value">Total Task: {tasks.length}</div>
      {#each tasks as task}
          {#if tasks[tasks.length - 1]._id === task._id }
            <div class="stat-desc">Task Complete: {taskComplete()}/{tasks.length}</div>
            <div class="radial-progress mt-3 mb-9" style="--value:{(taskComplete() * 100) / tasks.length}; --size:12rem; --thickness: 2rem;">{((taskComplete() * 100) / tasks.length).toFixed(2)}%</div>
            {/if}
      {/each}
    </div>
  </div>
  <TableStadistic dataTask={tasks}/>
</div>
