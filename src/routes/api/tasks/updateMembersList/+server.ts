import { lists } from "$db/lists";
import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { getMailUsers } from "$lib/keycloak/getUserList";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const list = {listName: body.get('listName') };
  const member = { newMember: body.get('newMember'), isDelete: body.get('isDelete') };


  const users = await getMailUsers();
  let userAux = users.find((user) => user.email === member.newMember);
  console.log("🚀 ~ file: +server.ts:14 ~ constPUT:RequestHandler= ~ userAux:", userAux)
  
  if (member.newMember !== null && userAux) {
    let listAux = await lists.findOne({ listName: list.listName });
    const membersList = listAux.listMembers;

    let userFoundIndex = membersList.findIndex(obj => obj.email === userAux.email);

    if (member.isDelete === 'True') {
      membersList.splice(userFoundIndex, 1);
    }else if(!(userFoundIndex !== -1)){
      membersList.push(userAux);
    }

    await lists.updateOne(
      { listName: list.listName },
      { $set: { listMembers: membersList } }
    );
  }


  const updatedList = await lists.findOne({ listName: list.listName });
  console.log(updatedList, locals);
  return json(updatedList);
};