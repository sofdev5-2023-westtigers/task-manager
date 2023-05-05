import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const list = {userId: body.get('userId'), taskName: body.get('taskName'), listName: body.get('listName'), isCompleted: body.get('isCompleted'),
                    date: body.get('date'), dates: body.get('dates')};
    const result = await tasks.insertOne(list);
    const insertedList = await tasks.findOne({_id : result.insertedId});

    // log all fields

    return json(insertedList);
});
export const PUT: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const listCalendar = {userId: body.get('userId'), oldDates: body.get('oldDates'), dates: body.get('dates'), oldDate: body.get('oldDate'), date: body.get('date')};
  const list = {userId: body.get('userId'), taskNameOld: body.get('taskNameOld'), taskName: body.get('taskName'), listName: body.get('listName'), isCompletedOld: body.get('isCompletedOld'),isCompleted: body.get('isCompleted')};

  const result = await tasks.updateOne(
      { userId: body.get('userId'), taskName:  body.get('taskNameOld'), isCompleted:list.isCompletedOld},
      { $set: { taskName: list.taskName, isCompleted: list.isCompleted}}
    );

  const resultDates = await tasks.updateOne(
      { userId: body.get('userId'), dates:  body.get('oldDates') },
      { $set: { dates: listCalendar.dates !== "" ? listCalendar.dates : null } }
    );

  const resultDate = await tasks.updateOne(
      { userId: body.get('userId'), date:  body.get('oldDate') },
      { $set: { date: listCalendar.date !== "" ? listCalendar.date : null } }
    );
  
  const updatedList = await tasks.findOne({ taskName: list.taskName});
  
  console.log(updatedList, locals);
  
  return json(updatedList);
};
