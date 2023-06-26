import type { User } from "$lib/auth/User";
import { getTokenClient } from "./getTokenclient";

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

export async function addUser(email: string) {
  let userGetList: User[] = await getClientsList();
  console.log(userGetList);
  userGetList.forEach(user => {
    if (!userMailList.includes(email)) {
      // console.log(user.email);      
      userMailList.push(user.email);
      return true;
    } else {
      return false;
    }    
  });
}

export async function deleteUser(email: string) {
  userMailList.forEach(userMail => {
    if (userMailList.includes(email)) {
      const index = userMailList.indexOf(email);     
      userMailList.splice(index, 1);
      return true;
    } else {
      return false;
    }    
  });
}