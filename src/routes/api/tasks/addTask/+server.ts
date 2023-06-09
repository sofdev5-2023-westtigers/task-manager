import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { parseDate, parseDates } from "./DateParse";

export const POST: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const taskName = body.get('taskName').trim();

  if (taskName === '') {
    return json({ error: "Task name cannot be empty or contain only spaces." }, { status: 400 });
  }else{
  const list = {
    userId: body.get('userId'),
    taskName,
    listName: body.get('listName'),
    isCompleted: body.get('isCompleted') === 'true',
    date: parseDate(body.get('date')),
    dates: parseDates(body.get('dates')),
    timeChronometer: parseInt(body.get('timeChronometer'))
  };

  const result = await tasks.insertOne(list);
  const insertedList = await tasks.findOne({ _id: result.insertedId });
  return json(insertedList);
}
};
