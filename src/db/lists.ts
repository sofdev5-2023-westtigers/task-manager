import db from './mongo'

export const lists = db.collection('tasks');