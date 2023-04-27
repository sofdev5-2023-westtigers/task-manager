<script>
    export let inputValue = '';
</script>

<div>
    <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
    <label class="label-task ml-2" for="task">{inputValue} </label>
</div>

<style>
    input:checked + label {
        text-decoration: line-through;
    }
</style>