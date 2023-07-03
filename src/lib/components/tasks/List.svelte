<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
  import type { User } from '$lib/auth/User';
  import NewTask from './NewTask.svelte';
  import { setMsg, msg } from '../modalAddMember/Addmsg';
  import { Button, Modal, Label, Input } from 'flowbite-svelte';
  import {
    date,
    dates,
    showPickDate,
    showPickDates,
    setFalsePicks
  } from '$calendar/CalendarOptions';
  import { tasksListEvents } from '$calendarTasks/CalendarTaskFunction';
  import { formatDate } from './TaskEdit';
  import { goto } from '$app/navigation';
  import CalendarTask from '../calendarTask/CalendarTask.svelte';
  import Header from '../header/Header.svelte';
  import { addNewTask, createTask, saveList } from './Tasks';
  import {
    getMembersList,
    deleteMemberList,
    addMemberList,
    getUserListKeycloak
  } from './MembersList';

  export let name = '';
  export let inputValue = [];
  let user: User;
  let isMenuOpen = false;
  let taskList = [];
  let walletModal = false;
  let modalAddMembersList = false;

  let email: string;

  let memberList: any;

  onMount(async () => {
    Registry.auth.getUser().subscribe((data: User) => {
      user = data;
    });
    memberList = await getMembersList(name);
    console.log(memberList);
  });

  async function addMemberToList() {
    await addMemberList(name, email);
  }

  async function deleteMemberToList(emailToDelete: string) {
    await deleteMemberList(name, emailToDelete);
  }

  const handleClick = () => {
    const url = `/todo-lists/${name}/stadisticsList`;
    goto(url, { target: '_blank' });
  };

  function submitForm() {
    const inputElement = document.getElementById('emailP');
    const inputValue1 = inputElement?.value;

    if (inputValue1) {
      const msgNew = {
        to: inputValue1,
        from: 'wt028615@gmail.com',
        subject: 'Added to a list!!',
        text: 'added to a list',
        html: 'in the task manager app you were added to the list ' + name
      };
    setMsg(msgNew);
      alert('send menssage for add member succefully');
      fetch('/api/mail/sendmail', {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: { 'Content-Type': 'application/json' }
      });
      modalAddMembersList = false;
    }
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>

<Header />

<div class=" top justify-center flex flex-wrap" style="padding-top: 100px;">
  <div style="display: inline-flex;">
    <a href="/todo-lists">
      <div class="back-list-button">
        <img src="../src/resources/leftArrow.png" alt="Back" />
      </div>
    </a>
    <div class="container-list max-w-xl p-4 mb-4">
      <label class="font-bold text-3xl title-info-list">{name.replace(/(.{22})/g, '$&\n')}</label>
      <div style="display: inline-flex; justify-content: center;">
        <!-- a -->
        <!-- {#if true} -->
        <div>
          <li class="li-newtask list-none">
            <input
              class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm"
              hidden
              type="text"
              name="item1-textfield"
              placeholder="Name Task...."
            />
            <div class="datepick-select" hidden>
              <DatePick />
            </div>
            <button
              class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm"
              hidden
              type="button"
              on:click={createTask(
                event,
                user,
                name,
                date,
                dates,
                showPickDate,
                showPickDates,
                setFalsePicks,
                taskList,
                false,
                true
              )}>Add</button
            >
          </li>
        </div>
        <!-- {/if} -->
        <!-- a -->
        <button class="btn-customPlus" on:click={() => (walletModal = true)}>+</button>
        <Modal bind:open={walletModal} size="xs" padding="xs">
          <h2>
            Member of List
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
                <path
                  fill-rule="evenodd"
                  d="M10 2v16m-8-8h16"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </Button>
            <!-- email -->
            <Modal bind:open={modalAddMembersList} size="xs" autoclose={false} class="w-full">
              <form class="flex flex-col space-y-6" action="#">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add New Member
                </h3>
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
                  on:click={addMemberToList}
                  on:click={() => submitForm()}>Add Member to List</Button
                >
              </form>
            </Modal>
          </h2>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            This is the list of all members added to this list
          </p>
          <ul class="my-4 space-y-3">
            {#each memberList as member}
              <li>
                <a
                  class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <svg
                    aria-hidden="true"
                    class="h-4"
                    viewBox="0 0 40 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z"
                      fill="#E17726"
                    /><path
                      d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z"
                      fill="#E27625"
                    /><path
                      d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z"
                      fill="#E27625"
                    /><path
                      d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z"
                      fill="#E27625"
                    /><path
                      d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z"
                      fill="#E27625"
                    /><path
                      d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z"
                      fill="#E27625"
                    /><path
                      d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z"
                      fill="#E27625"
                    /><path
                      d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z"
                      fill="#E27625"
                    /><path
                      d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z"
                      fill="#D5BFB2"
                    /><path
                      d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z"
                      fill="#D5BFB2"
                    /><path
                      d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z"
                      fill="#233447"
                    /><path
                      d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z"
                      fill="#233447"
                    /><path
                      d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z"
                      fill="#CC6228"
                    /><path
                      d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z"
                      fill="#CC6228"
                    /><path
                      d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z"
                      fill="#CC6228"
                    /><path
                      d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z"
                      fill="#CC6228"
                    /><path
                      d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z"
                      fill="#E27525"
                    /><path
                      d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z"
                      fill="#E27525"
                    /><path
                      d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z"
                      fill="#E27525"
                    /><path
                      d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z"
                      fill="#E27525"
                    /><path
                      d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z"
                      fill="#F5841F"
                    /><path
                      d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z"
                      fill="#F5841F"
                    /><path
                      d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z"
                      fill="#C0AC9D"
                    /><path
                      d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z"
                      fill="#161616"
                    /><path
                      d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z"
                      fill="#763E1A"
                    /><path
                      d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z"
                      fill="#763E1A"
                    /><path
                      d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z"
                      fill="#F5841F"
                    /><path
                      d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z"
                      fill="#F5841F"
                    /><path
                      d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z"
                      fill="#F5841F"
                    /></svg
                  >
                  <span class="flex-1 ml-3 whitespace-nowrap"
                    >{member.firstName} {member.lastName}</span
                  >
                  <Button
                    pill={true}
                    outline={true}
                    color="dark"
                    class="!p-2"
                    size="xs"
                    on:click={() => {
                      console.log(member.email);
                      deleteMemberToList(member.email);
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 10h16"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg></Button
                  >
                </a>
              </li>
            {/each}
          </ul>
        </Modal>

        <button class="btn-custom" style="" on:click={(event) => addNewTask(event, name)}
          >Add New Task</button
        >
        <button class="btn-custom" style="" on:click={handleClick}>See Stadistics</button>
      </div>
      <input
        class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm"
        type="text"
        style="display: none;"
      />
      <!-- task -->
      <ul class="list-Task mt-2 list-none">
        {#each inputValue as task}
          {#if task}
            {#if !task.dates && !task.date}
              <NewTask
                inputValue={task.taskName}
                nameList={task.listName}
                isChecked={JSON.parse(task.isCompleted)}
                timeChronometer={task.timeChronometer}
                isTimeChronometer={true}
              />
            {/if}
            {#if task.date}
              <NewTask
                inputValue={task.taskName}
                nameList={task.listName}
                isChecked={JSON.parse(task.isCompleted)}
                containsDate={true}
                dateValue={formatDate(task.date)}
                timeChronometer={task.timeChronometer}
                isTimeChronometer={true}
              />
            {/if}
            {#if task.dates}
              <NewTask
                inputValue={task.taskName}
                nameList={task.listName}
                isChecked={JSON.parse(task.isCompleted)}
                containsDates={true}
                dateValue={task.dates.map((dateString) => formatDate(dateString)).join('-')}
                timeChronometer={task.timeChronometer}
                isTimeChronometer={true}
              />
            {/if}
          {/if}
        {/each}
      </ul>
      <!-- task -->
    </div>
  </div>
  <div style="width: 50%; min-width:fit-content">
    <div
      class="calendarTaskComp"
      style="margin-right: 35px; margin-left: 35px; margin-top:3px; margin-bottom: 30px;"
    >
      {#each inputValue as task}
        {#if inputValue[inputValue.length - 1]._id === task._id}
          <CalendarTask tasksEvents={tasksListEvents} />
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  .title-info-list {
    white-space: pre-line;
    width: 100%;
    float: left;
    clear: left;
    color: white;
    margin-bottom: 10px;
  }

  .btn-customPlus {
    font-family: Roboto, sans-serif;
    font-weight: 0;
    font-size: 14px;
    color: #fff;
    background-color: #625341;
    padding: 10px 18px;
    border: solid #ffffff 2px;
    box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
    border-radius: 9px;
    transition: 500ms;
    transform: translateY(0);
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-left: 70px;
    margin-right: 15px;

    height: 30px;
    max-width: 80px;
    max-height: 30px;
  }

  .btn-custom {
    font-family: Roboto, sans-serif;
    font-weight: 0;
    font-size: 14px;
    color: #fff;
    background-color: #625341;
    padding: 10px 18px;
    border: solid #ffffff 2px;
    box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
    border-radius: 9px;
    transition: 500ms;
    transform: translateY(0);
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-right: 15px;
    width: 130px;
    height: 30px;
    max-width: 130px;
    max-height: 30px;
  }

  .btn-custom:hover {
    transition: 500ms;
    transform: translateY(-0px);
    background-color: #8e7657;
    color: #ffffff;
    border: solid #ffffff 2px;
    border-radius: 9px;
    width: 130px;
    height: 30px;
    max-width: 130px;
    max-height: 30px;
  }

  .back-list-button {
    display: flex;
    justify-content: center;
    align-items: top;
    background-color: #625341;
    width: 60px;
    height: 60px;
    transition: 500ms;
    border: solid #ffffff 2px;
    border-radius: 10px;
    padding: 6px;
  }

  .back-list-button:hover {
    transition: 500ms;
    transform: translateY(-0px);
    background-color: #8e7657;
    color: #ffffff;
    border: solid #ffffff 2px;
    border-radius: 9px;
  }

  .container-list {
    background-color: #a9907e;
    border-radius: 15px;
    margin-left: 15px;
    margin-right: 15px;
  }
</style>
