<style>
    .modal-box {
        background-color: #f8f9fa;
        padding: 20px;
        margin: 20px;
    }

    .modal-action > * {
        margin: 10px;
    }
</style>

<script>
    import { addUser } from "../../keycloak/getUserList";
    let showModal = false;
    let email = "";

    const handleAddUser = async () => {
        const result = await addUser(email);
        if (result) {
            alert("User successfully added");
        } else {
            alert("Error");
        }
        showModal = false;
        email = "";
    };
</script>

<button class="button-AddUser bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={() => showModal = true}>Add User</button>

{#if showModal}
    <div class="modal modal-open" id="my-modal-2">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Add User</h3>
            <input type="email" bind:value={email} class="input input-bordered mt-4 w-full" placeholder="User Email" required>
            <div class="modal-action">
                <button type="button" class="btn" on:click={handleAddUser}>Add</button>
                <a href="#" class="btn" on:click={() => showModal = false}>Cancel</a>
            </div>
        </div>
    </div>
{/if}
