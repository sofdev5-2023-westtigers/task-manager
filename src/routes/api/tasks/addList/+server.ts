import { lists } from "$db/lists";
import { json, type RequestHandler } from "@sveltejs/kit";
import { addUser, getMailUsers, deleteUser } from "$lib/keycloak/getUserList";

export const POST: RequestHandler = (async ({ request, locals }) => {
    const body = await request.formData();
    const listName = body.get('listName');
    const userId = body.get('userId');
    const listMembers: String[] = body.getAll('listMembers[]');

    const existingList = await lists.findOne({ listName: listName });
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

    if (existingList) {
        return json({ error: 'This list already exists' }, { status: 400 });
    } else {
        const list = { listName: listName, userId:userId, listMembers: members };
        console.log("LIST", list)
        const result = await lists.insertOne(list);
        const insertedList = await lists.findOne({ _id: result.insertedId });
        return json(insertedList);
    }

});
