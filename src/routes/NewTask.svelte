<script>
    export let inputValue = '';

    function save() {
        const parent = this.parentElement;

        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');

        if (inputs[1].value == "") {
            inputs[1].value = labels[0].textContent;
        } else {
            labels[0].textContent = inputs[1].value;
        }

        buttons[0].style.display = "none";
        inputs[1].style.display = "none";
    }

    function show() {
        const parent = this.parentElement;

        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');

        inputs[1].value = labels[0].textContent

        buttons[0].style.display = "inline";
        inputs[1].style.display = "inline";
    }
</script>

<div>
    <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
    <label class="label-task ml-2" for="task" on:click={show}>{inputValue}</label>
    <input type="text" style="display: none;">
    <button on:click={save} style="display: none;">Done</button>
</div>

<style>
    input:checked + label {
        text-decoration: line-through;
    }
</style>