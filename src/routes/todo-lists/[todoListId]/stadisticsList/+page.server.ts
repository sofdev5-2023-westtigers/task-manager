import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = ({params}) => {
    console.log(params.todoListId);
    return {id:params.todoListId};
}