<script lang="ts">
    export let dataTask  = [];

    function totalTime() : number{
        let totalTime = 0;
        dataTask.forEach(element => {
            if (element.isCompleted === true) {
                
            }
            totalTime += element.timeChronometer;
        });
        return totalTime;
    }
</script>

<div class="overflow-x-auto">
    <table class="table table-zebra w-full">
        <thead>
            <tr>
                <th>Nº</th>
                <th>Name Task</th>
                <th>Is Task Done?</th>
                <th>Total Time in Milliseconds</th>
            </tr>
        </thead>
        <tbody class="dataValuesTask" id="dataValuesTask">
            {#each dataTask as task, i}
                <tr>
                    <th>{i + 1}</th>
                    <td>{task.taskName}</td>
                    <td>{task.isCompleted === true ? 'Yes' : 'No'}</td>
                    <td>{task.timeChronometer}</td>
                </tr>
            {/each}
        </tbody>
        <thead>
            <tr>
                {#each dataTask as task, i}
                {#if i === dataTask.length - 1 }
                    <th></th>
                    <th></th>
                    <th>Total Time Milliseconds</th>
                    <th>{totalTime()}</th>
                {/if}
                {/each}

            </tr>
        </thead>
    </table>
</div>