// uno seria:

// let newMember = user.id // como ejemplo: "57bd8a30-009a-44c9-bc36-1c367dfeded5"



// const body = new FormData();

//         body.append('userId', user.userId.toString());

//         body.append('taskName', taskName);

//         body.append('listName', listName);

//         body.append('newMember',newMember)


// body.appped

//     const result = await fetch('/api/tasks/updateMemberTasks', {

//         method: 'PUT', body

//     });


export function addMemberList() {
  const body = new FormData();
  body.append('userId', user.userId.toString());
  body.append('taskName', taskName);
  body.append('listName', listName);
  body.append('newMember', newMember)
}