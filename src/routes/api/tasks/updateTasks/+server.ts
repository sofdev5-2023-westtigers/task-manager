import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";
import { parseDate, parseDates } from "../addTask/DateParse";
import { getMailUsers } from "$lib/keycloak/getUserList";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const listCalendar = { userId: body.get('userId'), oldDates: body.get('oldDates'), dates: body.get('dates'), oldDate: body.get('oldDate'), date: body.get('date'), modifyDate: body.get('modifyDate') };
  const list = { userId: body.get('userId'), taskNameOld: body.get('taskNameOld'), taskName: body.get('taskName'), listName: body.get('listName'), isCompletedOld: body.get('isCompletedOld'), isCompleted: body.get('isCompleted') };
  const listTimeChronometer = { userId: body.get('userId'), oldTimeChronometer: body.get('oldTimeChronometer'), timeChronometer: body.get('timeChronometer') };
  const member = { newMember: body.get('nemMember'), isDelete: body.get('isDelete') };

  const result = await tasks.updateOne(
    { userId: body.get('userId'), taskName: body.get('taskNameOld') },
    { $set: { taskName: list.taskName, isCompleted: list.isCompleted == "true" } }
  );

  if (body.get('modifyDate') === "true") {
    const resultDates = await tasks.updateOne(
      { userId: body.get('userId'), dates: parseDates(body.get('oldDates')) },
      { $set: { date: listCalendar.date !== "" ? parseDate(listCalendar.date) : null, dates: listCalendar.dates !== "" ? parseDates(listCalendar.dates) : null } }
    );

    const resultDate = await tasks.updateOne(
      { userId: body.get('userId'), date: parseDate(body.get('oldDate')) },
      { $set: { date: listCalendar.date !== "" ? parseDate(listCalendar.date) : null, dates: listCalendar.dates !== "" ? parseDates(listCalendar.dates) : null } }
    );
  }

  if (body.get('modifyChronometerTime') === "true") {
    const resultChronometer = await tasks.updateOne(
      { userId: body.get('userId'), taskName: body.get('taskName'), listName: body.get('listName') },
      { $set: { timeChronometer: listTimeChronometer.timeChronometer !== "" ? parseInt(listTimeChronometer.timeChronometer) : 0 } }
    );
  }


  const users = await getMailUsers();
  if (member.newMember !== null && users.find((user) => user.id === member.newMember)) {
    let taskAux = await tasks.findOne({ userId: body.get('userId'), taskName: body.get('taskName') });
    let membersList: string[] = taskAux.TaskMembers;

    if (member.isDelete = 'True') {
      membersList.splice(membersList.indexOf(member.newMember), 1);
    } else if (!(membersList.indexOf(member.newMember, 1) > -1)) {
      membersList.push(member.newMember);
    }

    await tasks.updateOne(
      { userId: body.get('userId'), taskName: body.get('taskName') },
      { $set: { TaskMembers: membersList } }
    );

    console.log("TASK: ", await tasks.findOne({ userId: body.get('userId'), taskName: body.get('taskName') }));
  }


  const updatedList = await tasks.findOne({ taskName: list.taskName });

  return json(updatedList);
};