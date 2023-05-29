import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { parseDate, parseDates } from "./DateParse";

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const list = {userId: body.get('userId'), taskName: body.get('taskName'), listName: body.get('listName'), isCompleted: body.get('isCompleted') === 'true',
        date: parseDate(body.get('date')), dates: parseDates(body.get('dates')), timeChronometer: parseInt(body.get('timeChronometer'))};
    const result = await tasks.insertOne(list);
    const insertedList = await tasks.findOne({_id : result.insertedId});
    return json(insertedList);
});