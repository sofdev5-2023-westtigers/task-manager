import { lists } from "$db/lists";
import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { getMailUsers } from "$lib/keycloak/getUserList";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const list = {listName: body.get('listName') };
  const member = { newMember: body.get('newMember'), isDelete: body.get('isDelete') };


  const users = await getMailUsers();
  let userAux = users.find((user) => user.id === member.newMember);
  if (member.newMember !== null && userAux) {
    let listAux = await lists.findOne({ listName: list.listName });
    const membersList = listAux.listMembers;

    if (member.isDelete === 'True') {
      membersList.splice(membersList.indexOf(userAux), 1);
    }else if(!(membersList.indexOf(userAux, 1) >= 0)){
      membersList.push(userAux);
    }

    await lists.updateOne(
      { listName: list.listName },
      { $set: { listMembers: membersList } }
    );
  }


  const updatedList = await tasks.findOne({ listName: list.listName });
  console.log(updatedList, locals);
  return json(updatedList);
};