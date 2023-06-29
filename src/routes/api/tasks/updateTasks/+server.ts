import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { parseDate, parseDates } from "../addTask/DateParse";
import { getMailUsers } from "$lib/keycloak/getUserList";
export const PUT: RequestHandler = async ({ request, locals }) => {
    const body = await request.formData();
    const listCalendar = {userId: body.get('userId'), oldDates: body.get('oldDates'), dates: body.get('dates'), oldDate: body.get('oldDate'), date: body.get('date'), modifyDate: body.get('modifyDate')};
    const list = {userId: body.get('userId'), taskNameOld: body.get('taskNameOld'), taskName: body.get('taskName'), listName: body.get('listName'), isCompletedOld: body.get('isCompletedOld'),isCompleted: body.get('isCompleted')};
    const listTimeChronometer = {userId: body.get('userId'), oldTimeChronometer: body.get('oldTimeChronometer'), timeChronometer: body.get('timeChronometer')};
    const listMembers: String[] = body.getAll('listMembers[]');
    const users = await getMailUsers();

    const members = listMembers
        .map(id => users.find(user => user.id === id))
        .filter(objetoEncontrado => objetoEncontrado !== undefined);

    const result = await tasks.updateOne(
        { userId: body.get('userId'), taskName:  body.get('taskNameOld')},
        { $set: { taskName: list.taskName, isCompleted: list.isCompleted == "true"}}
      );

    const result2 = await tasks.updateOne(
      { userId: body.get('userId'), taskName:  body.get('taskNameOld')},
      { $set: { taskName: list.taskName, TaskMembers: members}}
    );

      if (body.get('modifyDate') === "true") {
      const resultDates = await tasks.updateOne(
          { userId: body.get('userId'), dates:  parseDates(body.get('oldDates')) },
          { $set: { date: listCalendar.date !== "" ? parseDate(listCalendar.date) : null, dates: listCalendar.dates !== "" ? parseDates(listCalendar.dates) : null } }
        );

      const resultDate = await tasks.updateOne(
          { userId: body.get('userId'), date:  parseDate(body.get('oldDate')) },
          { $set: { date: listCalendar.date !== "" ? parseDate(listCalendar.date) : null, dates: listCalendar.dates !== "" ? parseDates(listCalendar.dates) : null } }
        );
      }

      if (body.get('modifyChronometerTime') === "true") {
        const resultChronometer = await tasks.updateOne(
          { userId: body.get('userId'), taskName:  body.get('taskName'), listName: body.get('listName')},
          { $set: { timeChronometer: listTimeChronometer.timeChronometer !== "" ? parseInt(listTimeChronometer.timeChronometer) : 0} }
        );
      }
  
    const updatedList = await tasks.findOne({ taskName: list.taskName});
    console.log("Update",updatedList);
    
    return json(updatedList);
  };