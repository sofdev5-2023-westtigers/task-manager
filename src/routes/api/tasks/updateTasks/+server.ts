import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { parseDate, parseDates } from "../addTask/DateParse";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const listCalendar = { userId: body.get('userId'), oldDates: body.get('oldDates'), dates: body.get('dates'), oldDate: body.get('oldDate'), date: body.get('date'), modifyDate: body.get('modifyDate') };
  const list = { userId: body.get('userId'), taskNameOld: body.get('taskNameOld'), taskName: body.get('taskName'), listName: body.get('listName'), isCompletedOld: body.get('isCompletedOld'), isCompleted: body.get('isCompleted') };
  const listTimeChronometer = { userId: body.get('userId'), oldTimeChronometer: body.get('oldTimeChronometer'), timeChronometer: body.get('timeChronometer') };

  const result = await tasks.updateOne(
    { taskName: body.get('taskNameOld'), listName: list.listName },
    { $set: { taskName: list.taskName, isCompleted: list.isCompleted == "true" } }
  );

  if (body.get('modifyDate') === "true") {
    const resultDates = await tasks.updateOne(
      { dates: parseDates(body.get('oldDates')), listName: list.listName , taskName: body.get('taskName')},
      { $set: { date: listCalendar.date !== "" ? parseDate(listCalendar.date) : null, dates: listCalendar.dates !== "" ? parseDates(listCalendar.dates) : null } }
    );

    const resultDate = await tasks.updateOne(
      { date: parseDate(body.get('oldDate')), listName: list.listName, taskName: body.get('taskName') },
      { $set: { date: listCalendar.date !== "" ? parseDate(listCalendar.date) : null, dates: listCalendar.dates !== "" ? parseDates(listCalendar.dates) : null } }
    );
  }

  if (body.get('modifyChronometerTime') === "true") {
    const resultChronometer = await tasks.updateOne(
      { taskName: body.get('taskName'), listName: body.get('listName') },
      { $set: { timeChronometer: listTimeChronometer.timeChronometer !== "" ? parseInt(listTimeChronometer.timeChronometer) : 0 } }
    );
  }

  const updatedList = await tasks.findOne({ taskName: list.taskName });
  return json(updatedList);
};