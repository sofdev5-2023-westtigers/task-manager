import { tasks } from "$db/tasks";
import { json, type RequestHandler } from "@sveltejs/kit";

function parseDate(date) {
    if (date !== null) {
        return new Date(String(date));
    }
    return null;
}

function parseDates(dates) {
    if (dates !== null) {
        let dateStr = String(dates);
        let a = dateStr.split('-').map(dateString => dateString.trim());
        let b = a.map(dateString => new Date(dateString));
        return b;
    }
    return null;
}

export const POST : RequestHandler = (async ({request,locals}) => {
    const body = await request.formData();
    const list = {userId: body.get('userId'), taskName: body.get('taskName'), listName: body.get('listName'), isCompleted: body.get('isCompleted') === 'true',
        date: parseDate(body.get('date')), dates: parseDates(body.get('dates'))};
    const result = await tasks.insertOne(list);
    const insertedList = await tasks.findOne({_id : result.insertedId});

    // log all fields

    return json(insertedList);
});
export const PUT: RequestHandler = async ({ request, locals }) => {
    const body = await request.formData();
    const list = {userId: body.get('userId'), taskNameOld: body.get('taskNameOld'), taskName: body.get('taskName'), listName: body.get('listName'), isCompleted: body.get('isCompleted')};
    const listCalendar = {userId: body.get('userId'), oldDates: body.get('oldDates'), dates: body.get('dates'), oldDate: body.get('oldDate'), date: body.get('date')};

    const result = await tasks.updateOne(
        { userId: body.get('userId'), taskName:  body.get('taskNameOld'), isCompleted: "false" || "true"},
        { $set: { taskName: list.taskName, isCompleted: list.isCompleted  === 'true'}}
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