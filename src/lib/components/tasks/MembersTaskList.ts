export async function getMembersTaskList(listName: string, taskName: string) {
  const body = new FormData();
  body.append('listName', listName);
  body.append('taskName', taskName);
  return await fetch('/api/tasks/getMembersTask', {
    method: 'PUT',
    body
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

export async function addMemberTaskList(listName: string, email: string, taskName: string) {
  const body = new FormData();
  body.append('listName', listName);
  body.append('newMember', email);
  body.append('taskName', taskName);

  return await fetch('/api/tasks/updateMembersTask', {
    method: 'PUT',
    body
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

export async function deleteMemberTaskList(listName: string, email: string, taskName: string) {
  const body = new FormData();
  body.append('listName', listName);
  body.append('newMember', email);
  body.append('taskName', taskName);
  body.append('isDelete', 'True');

  return await fetch('/api/tasks/updateMembersTask', {
    method: 'PUT',
    body
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}