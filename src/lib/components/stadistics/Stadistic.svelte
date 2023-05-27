<script>
  import TableStadistic from "./TableStadistic.svelte"
  import AreaChart from "./AreaChart.svelte";
	import Header from "../header/Header.svelte";
	import BarChartV from "./BarChartV.svelte";
	import DonutChart from "./DonutChart.svelte";
  import { onMount } from "svelte";
	import PieChart from "./PieChart.svelte";
  import { goto } from '$app/navigation';

  export let nameList;

  let isAreaChart = false;
  let isBarChartV = false;
  let isDonutChart = false;
  let isPieChart = true;

  const handleClick = () => {
    const url = `/todo-lists/${nameList}`;
    goto(url, { target: '_blank' });
  };

  function chooseGraphBarH() {
      isAreaChart = true;
      isBarChartV = false;
      isDonutChart = false;
      isPieChart = false;
  }

  function chooseGraphBarV() {
      isAreaChart = false;
      isBarChartV = true;
      isDonutChart = false;
      isPieChart = false;
  }

  function chooseGraphPieChart() {
    isAreaChart = false;
    isBarChartV = false;
    isDonutChart = false;
    isPieChart = true;
  }

  function chooseGraphDonutChart() {
      isAreaChart = false;
      isBarChartV = false;
      isDonutChart = true;
      isPieChart = false;
  }
</script>



<Header/>

<div id="containerCharts"  style="float: right;">
  <div style="margin-left: 400px; font-size: 34px; font-weight: bold; color: black;" class="stat-value">overview</div>

  <div id="containerRadioOptions" style="float: left; margin-top:300px; margin-left: -118px;">
    <div class="form-control">
      <input type="radio" name="radio-10" class="radio checked:bg-gray-800" on:change={chooseGraphBarV}/>
      <span class="label-text">Bar Chart Vertical</span>
    </div>
    <div class="form-control">
      <input type="radio" name="radio-10" class="radio checked:bg-gray-800 mt-3"  on:change={chooseGraphBarH}/>
      <span class="label-text">Bar Chart Horizontal</span>
    </div>
    <div class="form-control">
      <input type="radio" name="radio-10" class="radio checked:bg-gray-800 mt-3" on:change={chooseGraphPieChart}/>
      <span class="label-text">Pie Chart</span> 
    </div>
    <div class="form-control">
      <input type="radio" name="radio-10" class="radio checked:bg-gray-800 mt-3" on:change={chooseGraphDonutChart}/>
      <span class="label-text">Donut Chart</span> 
    </div>
  </div>
  <div id="containerCharts" style="float: right; width: 78%; margin-right: 80px;">
    {#if isAreaChart}
      <div id="containerCharts" style="margin-top: 190px;">
        <AreaChart/>
      </div>
    {/if}
    {#if isBarChartV}
    <div id="containerCharts" style="margin-top: 190px;">
      <BarChartV/>
    </div>
    {/if}
    {#if isDonutChart}
      <DonutChart/>
    {/if}
    {#if isPieChart}
      <PieChart/>
    {/if}
  </div>
</div>



<div id="containerTable"  style="float: left; margin-left: 20px; margin-top: 10px;">
  <button class="btn btn-outline btn-secundary" on:click={handleClick}>Return List</button>
</div>

<div id="containerTable"  style="float: left; margin-top: 290px; margin-left: -30px;">

  <TableStadistic/>
</div>


