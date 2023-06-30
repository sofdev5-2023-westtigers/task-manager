import type { User } from "$lib/auth/User";
import { getTokenClient } from "./getTokenclient";

export let usersKeycloakMail: string[] = [];
export let userMailList: string[] = [];

export async function getClientsList() {
  let json = await getTokenClient();
  // console.log(json);
  let userslist: User[] = [];

  return fetch('http://localhost:8080/admin/realms/myrealm/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + json.access_token
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      for (const user of data) {
        userslist.push(user);
      }
      // userslist.forEach(element => {
      //   console.log("- " + element.access.view);

      // }); 
      console.log(typeof userslist);

      return userslist;
    })
    .catch(error => console.error(error));
}

export async function getMailUsers() {
  let userGetList: User[] = await getClientsList();
  console.log(userGetList);
  userGetList.forEach(user => {
    console.log(user.email);
    usersKeycloakMail.push(user.email);
    console.log('User get list:');
    console.log(usersKeycloakMail);
  });
  return userGetList;
}

export async function addUser(email: string) {
  if (usersKeycloakMail.includes(email)) {
   userMailList.push(email);
   console.log("🚀 ~ file: getUserList.ts:50 ~ addUser ~ userMailList:", userMailList)
   
   return true;
  } else {
    return false;
  }
}

export async function deleteUser(email: string) {
  if (usersKeycloakMail.includes(email)) {
    const index = usersKeycloakMail.indexOf(email);
    usersKeycloakMail.splice(index, 1);
    return true;
  } else {
    return false;
  }
}