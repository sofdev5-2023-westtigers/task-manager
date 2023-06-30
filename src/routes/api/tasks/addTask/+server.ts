import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { parseDate, parseDates } from "./DateParse";
import {getMailUsers } from "$lib/keycloak/getUserList";

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const listMembers: String[] = body.getAll('listMembers[]');
    const users = await getMailUsers();
    const members = [];

    listMembers.forEach((id) => {
        const objetoEncontrado = users.find((user) => user.id === id);
        if (objetoEncontrado) {
            members.push(objetoEncontrado);
        } else {
            console.log(`El ID "${id}" no existe en la lista de objetos.`);
        }
    });

    const list = {userId: body.get('userId'), taskName: body.get('taskName'), listName: body.get('listName'), isCompleted: body.get('isCompleted') === 'true',
        date: parseDate(body.get('date')), dates: parseDates(body.get('dates')), timeChronometer: parseInt(body.get('timeChronometer')), TaskMembers: members};
        
    const existingTask = await tasks.findOne({ listName:list.listName, taskName: list.taskName, userId: list.userId});
    if (existingTask) {
        return "error";
    }      

    const result = await tasks.insertOne(list);
    const insertedList = await tasks.findOne({_id : result.insertedId});
    return json(insertedList);
});