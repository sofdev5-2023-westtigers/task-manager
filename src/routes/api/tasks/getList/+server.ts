import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
    const groupedTasks = await tasks.aggregate([
      { $group: { _id: { userId: "$userId", listName: "$listName" }, tasks: { $push: "$$ROOT" } } }
    ]).toArray();
    console.log(groupedTasks);
    return json(groupedTasks);
  };