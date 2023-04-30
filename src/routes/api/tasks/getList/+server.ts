import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";

 

export const GET: RequestHandler = async ({ locals }) => {
    const allTasks = await tasks.find().toArray();
    
    // log all tasks
    //console.log(allTasks, locals);
  
    return json(allTasks);
};
