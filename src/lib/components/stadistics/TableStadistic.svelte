<script lang="ts">
    export let dataTask = [];

    function totalTime(): number {
        let totalTimeInSeconds = 0;
        dataTask.forEach(element => {
            if (element.isCompleted === true) {
                totalTimeInSeconds += element.timeChronometer / 1000; // Convertir de milisegundos a segundos
            }
        });
        return totalTimeInSeconds;
    }
</script>

<div class="overflow-x-auto">
    <table class="table table-zebra w-full">
        <thead>
            <tr>
                <th>Nº</th>
                <th>Name Task</th>
                <th>Is Task Done?</th>
                <th>Total Time in Seconds</th>
            </tr>
        </thead>
        <tbody class="dataValuesTask" id="dataValuesTask">
            {#each dataTask as task, i}
                <tr>
                    <th>{i + 1}</th>
                    <td>{task.taskName}</td>
                    <td>{task.isCompleted === true ? 'Yes' : 'No'}</td>
                    <td>{Math.floor(task.timeChronometer / 1000)}</td> <!-- Mostrar tiempo en segundos -->
                </tr>
            {/each}
        </tbody>
        <thead>
            <tr>
                {#each dataTask as task, i}
                    {#if i === dataTask.length - 1 }
                        <th></th>
                        <th></th>
                        <th>Total Seconds</th>
                        <th>{Math.floor(totalTime())}</th> <!-- Mostrar tiempo total en segundos sin decimales -->
                    {/if}
                {/each}
            </tr>
        </thead>
    </table>
</div>
