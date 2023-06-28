<script lang="ts">
    let limitToName = 26;
    let errorMessage = '';
    let nameError = '';
    let showAlert = false;
    let showError = false;
    let groupedTasks: any[] = [];
    let listTasks: any[] = [];
    let showForm = false;
    let listName = '';

    async function fetchTasks() {
        const res = await fetch('/api/tasks/getList');
        groupedTasks = await res.json();
    }

    async function createList() {
        const nameInput = document.querySelector('.text-nameList');
        const name = nameInput.value.trim();
        console.log(name);
        if (name) {
            if (name.length > limitToName) {
            nameError = 'List name should not exceed ',limitToName,' characters.';
            showAlert = true;
            return;
            }
            nameError = '';
            showAlert = false;
            const body = new FormData();
            body.append('listName', name);
            const response = await fetch('/api/tasks/addList', {
            method: 'POST', body
            });
            if (response.ok) {
            const buttonNewList = document.querySelector('.button-NewList');
            const buttonSortFil = document.querySelector('.button-Filtrar-Ordenar');
            buttonNewList?.removeAttribute('hidden');
            buttonSortFil?.removeAttribute('hidden');
            listTasks = [...listTasks, { name, id: Date.now() }];
            nameInput.value = '';
            } else {
            const data = await response.json();
            errorMessage = data.error;
            showError = true;
            setTimeout(() => {
                showError = false;
            }, 2000);
            }
        }
        handleHide();
    }

    function handleAddList() {
        showForm = true;
    }

    function handleHide() {
        showForm = false;
    }
</script>
<!-- 
<div id="addNewList" class="addNewList mt-2 mb-4 sm:mb-0 flex items-center justify-center sm:justify-start" style="padding-left: 100px; padding-right: 100px">
    <input class="text-nameList border-gray-300 bg-gray-100 rounded-[20PX] w-full sm:w-auto px-4 py-2 mr-2 sm:mr-4" type="text" name="name" placeholder="Name List...">
    <button class="button-addList bg-[#ABC4AA] text-white px-4 py-2 rounded-md" type="button" on:click={createList}>Add List</button>
    {#if showAlert && nameError !== ''}
        <div class="alert mt-2 text-red-500 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span class="block sm:inline">{nameError}</span>
        </div>
    {/if}
    {#if !isToggled}
        <div class="form-control">
            <label class="label cursor-pointer">
            <input type="checkbox" class="toggle ml-2 mr-2" on:click={toggle}/>
            <span class="label-text">Board Mode</span>
            </label>
        </div>
    {:else}
        <div class="form-control">
            <label class="label cursor-pointer">
            <input type="checkbox" class="toggle ml-2 mr-2" on:click={toggle} checked/>
            <span class="label-text">Board Mode</span>
            </label>
        </div>
    {/if}
</div> -->

{#if !showForm}
    <button
        class="button-addList bg-[#ABC4AA] text-white px-4 py-2 rounded-md"
        type="button"
        style="font-weight: bold; width: 250px; font-size:large;"
        on:click={handleAddList}>
            + Add List
    </button>
{/if}

{#if showForm}
    <div
        class="px-4 py-2 rounded-md"
        style="background-color: #F2F2F2; width: 250px; border: 3px solid #D9D9D9;"
    >
        <div class="flex justify-center">
            <input class="text-nameList rounded-md text-gray-600" style="border: 3px solid #D9D9D9;" type="text" bind:value={listName} placeholder="List Name" />
        </div>
        <div class=" mt-2">
            <button class="button-addList rounded-md bg-[#ABC4AA]" style="height: 25px; width: 50px; border: 3px solid #92AD91;" on:click={createList}>OK</button>
            <button class="rounded-md " style="background-color: #EDB491; height: 25px; width: 80px; border: 3px solid #BB9075;" on:click={handleHide}>CANCEL</button>
        </div>
    </div>
{/if}

