import { lists } from "$db/lists";
import { json, type RequestHandler, createResponse } from "@sveltejs/kit";

class ListNameExceedsMaxLengthError extends Error {
  constructor() {
    super("List name should not exceed 26 characters.");
    this.name = "ListNameExceedsMaxLengthError";
  }
}

export const POST: RequestHandler = async ({ request, locals }) => {
  const body = await request.formData();
  const listName = body.get('listName');

  if (listName && listName.length > 26) {
    throw new ListNameExceedsMaxLengthError();
  } else {
    const list = { listName };
    const result = await lists.insertOne(list);
    const insertedList = await lists.findOne({ _id: result.insertedId });
    return json(insertedList);
  }
};
