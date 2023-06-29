import db from './mongo'

export const lists = db.collection('lists');
export const listsTest = db.collection('listsTest');