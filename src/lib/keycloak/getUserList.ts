import { getTokenClient } from "./getTokenclient";

export async function getClientsList() {
  let json = await getTokenClient();
  // console.log(json);
  let userslist: any[] = [];

  fetch('http://localhost:8080/admin/realms/myrealm/users', {
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
      // return userslist;
    })
    .catch(error => console.error(error));
}