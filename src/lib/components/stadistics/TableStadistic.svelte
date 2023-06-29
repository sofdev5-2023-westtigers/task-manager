<script lang="ts">
    export let dataTask = [];
    export let varchar:string = 'a';
    export let times;

</script>

<div class="overflow-x-auto">
    <table class="table table-zebra w-full">
        <thead>
            <tr>
                <td class="">Nº</td>
                <td>Name Task</td>
                <td>Is Task Done?</td>
                <td>Total Time in Seconds</td>
            </tr>
        </thead>
        <tbody class="dataValuesTask" id="dataValuesTask">
            {#each dataTask as task, i}
                <tr>
                    <td>{i + 1}</td>
                    <td>{task.taskName}</td>
                    <td>{task.isCompleted === true ? 'Yes' : 'No'}</td>
                    <td>{Math.floor(task.timeChronometer / 1000)}</td>
                </tr>
            {/each}
        </tbody>
        <thead>
            <tr>
                {#each dataTask as task, i}
                    {#if i === dataTask.length - 1 }
                        <td></td>
                        <th></th>
                        <th>Total Seconds</th>
                        <th>{Math.floor(times)}</th>
                    {/if}
                {/each}
            </tr>
        </thead>
    </table>
</div>
