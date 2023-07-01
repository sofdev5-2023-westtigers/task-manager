import { lists } from "$db/lists";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ request, locals }) => {
    const body = await request.formData();
    const list = {listName: body.get('listName') };


    let lisAux = await lists.findOne({ listName: list.listName });
    let membersList = lisAux.listMembers;
    
    return json(membersList);
};
