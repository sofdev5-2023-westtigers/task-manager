export function getTokenClient() {
  return fetch('http://localhost:8080/realms/myrealm/protocol/openid-connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'client_id': 'backendclient',
      'client_secret': '1ZjngEaIQQqWhsofQlwyJqFnn0L7blht',
      'grant_type': 'client_credentials'
    })
  })
    .then(response => response.json())
    .catch(error => console.error(error))
}