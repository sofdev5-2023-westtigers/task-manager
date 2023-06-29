import { lists } from "$db/lists";
import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { getMailUsers } from "$lib/keycloak/getUserList";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const list = { userId: body.get('userId'), listNameOld: body.get('listNameOld'), listName: body.get('listName') };
  const member = { newMember: body.get('nemMember'), isDelete: body.get('isDelete') };

  const result = await tasks.updateMany(
    { listName: body.get('listNameOld') },
    { $set: { listName: list.listName } }
  );
  const result2 = await lists.updateOne(
    { listName: body.get('listNameOld') },
    { $set: { listName: list.listName } }
  );
  const result3 = await tasks.updateMany(
    { listName: list.listName },
    { $set: { listName: list.listName } }
  );

  const users = await getMailUsers();
  if (member.newMember !== null && users.find((user) => user.id === member.newMember)) {
    let listAux = await lists.findOne({ listName: body.get('listNameOld') });
    const membersList: String[] = listAux.listMembers;
    console.log(membersList);

    if (member.isDelete) {
      membersList.splice(membersList.indexOf(member.newMember), 1);
    }else if(!(membersList.indexOf(member.newMember, 1) >= 0)){
      membersList.push(member.newMember);
    }

    await lists.updateOne(
      { listName: body.get('listNameOld') },
      { $set: { listMembers: membersList } }
    );
  }


  const updatedList = await tasks.findOne({ listName: list.listName });
  console.log(updatedList, locals);
  return json(updatedList);
};