<script lang="ts">
    export let dataTask = [];
    export let times;
</script>
<style>
    .dataValuesTask {
        max-height: 400px;
        overflow-y: scroll;
    }
    </style>
    
    <div class="overflow-x-auto" style="height: 400px; width: 550px">
        <div class="flex place-content-center" style="display: flex; flex-direction: column; height: 400px;">
            <div>
                <table class="table table-zebra" style="width: 550px;">
                    <thead>
                        <tr>
                            <td class=" w-16">Nº</td>
                            <td style="width: 216px">Name Task</td>
                            <td>Is Task Done?</td>
                            <td>Total Sec</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="dataValuesTask" id="dataValuesTask">
                <table class="table table-zebra w-full">
                    <tbody>
                    {#each dataTask as task, i}
                <tr>
                    <td class=" w-16">{i + 1}</td>
                    <td class=" w-52">{task.taskName}</td>
                    <td>{task.isCompleted === true ? 'Yes' : 'No'}</td>
                    <td>{Math.floor(task.timeChronometer / 1000)}</td>
                </tr>
                {/each}
                </tbody>
            </table>
        </div>
        <div>
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <td></td>
                        <th></th>
                        <th>Total Seconds</th>
                        <th>{Math.floor(times)}</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
