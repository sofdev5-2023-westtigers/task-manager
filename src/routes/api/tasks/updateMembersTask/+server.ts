import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { parseDate, parseDates } from "../addTask/DateParse";
import { getMailUsers } from "$lib/keycloak/getUserList";

export const PUT: RequestHandler = async ({ request, locals }) => {
    const body = await request.formData();
    const list = {taskName: body.get('taskName'), listName: body.get('listName') };
    const member = { newMember: body.get('newMember'), isDelete: body.get('isDelete') };

    const users = await getMailUsers();
    let userAux = users.find((user) => user.id === member.newMember);
    if (member.newMember !== null && userAux) {
        let taskAux = await tasks.findOne({ listName: list.listName, taskName: list.taskName });
        let membersList = taskAux.TaskMembers;

        if (member.isDelete === 'True') {
            membersList.splice(membersList.indexOf(userAux), 1);
        } else if (!(membersList.indexOf(userAux, 1) >= 0)) {
            membersList.push(userAux);
        }

        let a = await tasks.updateOne(
            { listName: list.listName, taskName: list.taskName },
            { $set: { TaskMembers: membersList } }
        );
    }

    const updatedList = await tasks.findOne({ taskName: list.taskName, listName:list.listName });
    return json(updatedList);
};