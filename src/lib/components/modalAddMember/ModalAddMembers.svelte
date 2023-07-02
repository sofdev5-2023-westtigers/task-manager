<script lang="ts">
  import { setMsg, msg } from './Addmsg';
  import { Button, Modal, Label, Input } from 'flowbite-svelte';
  import Members from './Members.svelte';

  export let subjectMsg: String = '';
  export let textMsg: String = '';
  export let htmlMsg: String = '';
  export let nameUse: String = '';
  export let modalAddMemberList = false;

  export let taskName: string;
  export let listName: string;

  import {
    getMembersTaskList,
    addMemberTaskList,
    deleteMemberTaskList
  } from '../tasks/MembersTaskList';
  import { onMount } from 'svelte';

  let modalAddMembersList = false;

  let email: string;

  let memberList: any;

  onMount(async () => {
    memberList = await getMembersTaskList(listName, taskName);
    console.log('🚀 ~ file: ModalAddMembers.svelte:30 ~ onMount ~ memberList:', memberList);
  });

  async function addMemberToTask() {
    addMemberTaskList(listName, email, taskName);
  }

  function submitForm() {
    const inputElement = document.getElementById('emailP');
    const email = inputElement?.value;

    if (email) {
      const msgNew = {
        to: email,
        from: 'wt028615@gmail.com',
        subject: subjectMsg,
        text: textMsg,
        html: htmlMsg
      };
      setMsg(msgNew);
      alert('send menssage for add member in a ' + nameUse + ' succefully');
      fetch('/api/mail/sendmail', {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: { 'Content-Type': 'application/json' }
      });
      modalAddMembersList = false;
    }
  }
</script>

<Modal bind:open={modalAddMemberList} size="xs">
  <h2>
    Member of {nameUse}
    <Button
      pill={true}
      outline={true}
      color="green"
      class="!p-2"
      size="xl"
      on:click={() => (modalAddMembersList = true)}
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill-rule="evenodd" d="M10 2v16m-8-8h16" stroke="currentColor" stroke-width="2" />
      </svg>
    </Button>
    <!-- email -->
    <Modal bind:open={modalAddMembersList} size="xs" autoclose={false} class="w-full">
      <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Member</h3>
        <Label class="space-y-2">
          <span>Email</span>
          <Input
            id="emailP"
            type="email"
            color="green"
            name="email"
            placeholder="name@email.com"
            required
            bind:value={email}
          />
        </Label>
        <Button
          type="submit"
          color="green"
          class="w-full1"
          on:click={() => {
            addMemberTaskList(listName, email, taskName);
            getMembersTaskList(listName, taskName);
            submitForm();
          }}>Add Member to {nameUse}</Button
        >
      </form>
    </Modal>
  </h2>
  <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
    This is the list of all members added to this {nameUse}
  </p>
  <ul class="my-4 space-y-3">
    {#each memberList as member}
      <Members firstName={member.firstName} lastName={member.lastName} listName={listName} taskName={taskName} email={member.email}/>
    {/each}
  </ul>
</Modal>
