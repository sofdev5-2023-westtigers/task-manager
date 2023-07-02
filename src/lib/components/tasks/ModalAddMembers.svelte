<script lang="ts">
	import { Button, Modal, Label, Input } from 'flowbite-svelte';
	import {setMsg, msg} from './Addmsg';
    import NewMemberAdded from './NewMemberAdded.svelte';

	export let htmlMenssage  : String | null= '';
	export let textMenssage  : String | null= '';
	export let subjectMenssage  : String | null= '';
	export let titleModal : String | null = '';
	export let modalAddMembers = false;

	let modalAddMember = false;

	function submitForm() {
        const inputElement = document.getElementById("emailP");
    	const inputValue1 = inputElement?.value;

        const msgNew = {
        to:  inputValue1,
        from:  "wt028615@gmail.com",
        subject: subjectMenssage,
        text: textMenssage,
        html: htmlMenssage,
        };

    	setMsg(msgNew);
    	if (msg !== null) {
			alert("send menssage for add member in" + titleModal + "succefully");
    	    fetch("/api/mail/sendmail",{
    	      method: "POST",
    	      body: JSON.stringify(msg),
    	      headers: {'Content-Type':'application/json'}
    	    });
		    modalAddMember = false;
    	}
        setMsg(null);
  	}
</script>
		<Modal  bind:open={modalAddMembers} size="xs">
			<h2>Member of {titleModal}
				<Button pill={true} outline={true} color="green" class="!p-2" size="xl"  on:click={() => modalAddMember = true}>
					<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M10 2v16m-8-8h16" stroke="currentColor" stroke-width="2"></path>
					</svg>
				</Button>
				<Modal bind:open={modalAddMember} size="xs" autoclose={false} class="w-full">
					<form class="flex flex-col space-y-6" action="#">
					  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Member</h3>
					  <Label class="space-y-2">
						<span>Email</span>
						<Input id="emailP" type="email" color="green" name="email" placeholder="name@email.com" required />
					  </Label>
					  <Button type="submit" color="green" class="w-full1" on:click={() => submitForm()}>Add Member to {titleModal}</Button>
					</form>
				  </Modal>
			</h2>
			<p class="text-sm font-normal text-gray-500 dark:text-gray-400">This is the list of all members added to this {titleModal}</p>
			<ul class="my-4 space-y-3">
			  <li>
				<NewMemberAdded
					nameMember={"Pepito perez"}
				/>
				<NewMemberAdded
					nameMember={"Pepito perez"}
				/>
			  </li>
			</ul>
		</Modal>