import { Keycloak } from '@keycloak/keycloak-admin-client';

export const keycloak = new Keycloak({
  realm: 'myrealm',
  clientId: 'myclient',
  clientSecret: 'Ka1uvGYQHbLCUh03zukuqpFoaj0ilN0M',
  serverUrl: 'http://localhost:8080/',
});

export const users = await keycloak.users.list();

for (const user of users) {
  console.log(user.username);
}
