import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { lists } from '../../../db/lists';

export const load:PageServerLoad = ({params}) => {
    console.log(params.todoListId);
    //throw error(404);
    return {id:params.todoListId};
}