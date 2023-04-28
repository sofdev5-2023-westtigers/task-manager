<script>
  export let name = '';
  import Task from './Task.svelte';

  function addNewTask(event) {
    if (name) {
      const newTask = new Task({
        target: event.target.parentNode.querySelector('.ul-listTasks'),
      });
    }
  }

  function save() {
        const parent = this.parentElement;

        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');

        if (inputs[0].value == "") {
            inputs[0].value = labels[0].textContent;
        } else {
            labels[0].textContent = inputs[0].value;
        }

        buttons[1].style.display = "none";
        inputs[0].style.display = "none";
    }

    function show() {
        const parent = this.parentElement;

        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');

        inputs[0].value = labels[0].textContent

        buttons[1].style.display = "inline";
        inputs[0].style.display = "inline";
    }
</script>

<div class="list bg-[#A9907E] rounded-[10PX] w-1/2 p-4 mb-4">
  <label class="title-List font-bold" on:click={show}>{name}</label>
  <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask}>Add task</button>
  <input type="text" style="display: none;">
  <button on:click={save} style="display: none;">Done</button>
  <ul class="ul-listTasks"></ul>
</div>
