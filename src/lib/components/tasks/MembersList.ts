export async function getMembersList(listName: string) {
  const body = new FormData();
  body.append('listName', listName);
  return await fetch('/api/tasks/getMembersList', {
    method: 'PUT',
    body
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

export async function addMemberList(listName: string, email: string) {
  const body = new FormData();
  body.append('listName', listName);
  body.append('newMember', email);

  return await fetch('/api/tasks/updateMembersList', {
    method: 'PUT',
    body
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

export async function deleteMemberList(listName: string, email: string) {
  const body = new FormData();
  body.append('listName', listName);
  body.append('newMember', email);
  body.append('isDelete', 'True');

  return await fetch('/api/tasks/updateMembersList', {
    method: 'PUT',
    body
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

export async function getUserListKeycloak() {
  return await fetch('/api/tasks/getKeycloakUsers', {
    method: 'PUT'
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

// export async function name(params:type) {
  
// }